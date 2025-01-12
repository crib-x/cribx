'use server'
import { getDataFromSupabase, insertDataToSupabase, updateDataInSupabase } from "@/hooks/database-actions"
import { sendEmail } from "@/lib/services/email-service"
import { getAgentLeaseRequestEmailTemplate, getLeaseRequestEmailTemplate } from "@/lib/services/email-templates"
import { createClient } from "@/lib/supabase/server"
import { generateDiscountCode } from "@/lib/utils/discount-code"
import { LeaseRequestError } from "@/lib/utils/errorHandler"

export const sendLeaseRequest = async (data: any, propertyTitle: string, discountAmount: string, propertyEmail: string, propertyId: string, propertyUrl: string) => {



    try {
        const isPending = await isRequestPending(propertyId, data.email)
        if (isPending) {
            throw new LeaseRequestError(
                'You already have a pending request for this property. You may have to wait for the agent to respond to your previous request',
                'DUPLICATE_REQUEST',
                409
            );
        }
        const discountCode = generateDiscountCode() // TODO: Confirm if the has been used before
        await sendEmail({
            to: data.email,
            subject: `Your Lease Request - ${discountCode}`,
            html: getLeaseRequestEmailTemplate({
                name: data.name,
                discountCode,
                propertyName: propertyTitle,
                discountAmount,
                propertyUrl 
            })
        })
        await sendEmail({
            to: propertyEmail as string,
            subject: `New Lease Request - ${discountCode}`,
            html: getAgentLeaseRequestEmailTemplate({
                propertyName: propertyTitle,
                name: data.name,
                email: data.email,
                discountCode,
                discountAmount,
                moveInDate: data.moveInDate,
                phone: data.phone,
                needsPickup: data.needsPickup,
            })
        })
        saveRequestToDb(data, discountCode, propertyTitle, propertyEmail, propertyId, propertyUrl)
        return {
            success: true,
            message: 'Lease request submitted successfully',
            data: { discountCode }
        };
    } catch (error: unknown) {
        if (error instanceof LeaseRequestError) {
            throw error;
        }

        // Handle unexpected errors
        console.error('Unexpected error in sendLeaseRequest:', error);
        throw new LeaseRequestError(
            'An unexpected error occurred',
            'INTERNAL_ERROR',
            500
        );
    }


}

export const getAllLeaseRequests = async () => {
    try {
        const data = await getDataFromSupabase('lease_request', true)
        return data
    } catch (error) {
        throw error
    }
}


export const updateLeaseRequestStatus = async (leaseId: string, status: string, comment: string) => {
    try {
        const payload = {
            status,
            comment
        }
        await updateDataInSupabase(leaseId, payload, 'lease_request', true)
        return { message: 'Status updated successfully' }
    } catch (error) {
        throw error
    }
}

const saveRequestToDb = async (data: any, discountCode: string, propertyTitle: string, propertyEmail: string, propertyId: string, propertyUrl: string) => {
    const payload = {
        requestor_name: data.name,
        requestor_email: data.email,
        requestor_phone: data.phone,
        move_in_date: data.moveInDate,
        needs_pickup: data.needsPickup,
        message: data.message,
        property_id: propertyId,
        discount: discountCode,
        receiver_email: propertyEmail,
        property_title: propertyTitle,
        status: "pending",
        external_id: propertyUrl
    }
    insertDataToSupabase(payload, 'lease_request', false)
}

const isRequestPending = async (propertyId: string, email: string) => {

    const supabase = await createClient()
    const { data, error } = await supabase.from('lease_request').select('*').eq('property_id', propertyId).eq('requestor_email', email)
    if (error) {
        throw error
    }
    console.log('data', data)
    return data.length > 0
}

