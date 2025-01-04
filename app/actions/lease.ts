'use server'
import { getDataFromSupabase, insertDataToSupabase, updateDataInSupabase } from "@/hooks/database-actions"
import { sendEmail } from "@/lib/services/email-service"
import { getAgentLeaseRequestEmailTemplate, getLeaseRequestEmailTemplate } from "@/lib/services/email-templates"
import { generateDiscountCode } from "@/lib/utils/discount-code"

export const sendLeaseRequest = async (data: any, propertyTitle: string, discountAmount: string, propertyEmail: string, propertyId: string) => {
    console.log('data', data)
    try {
        const discountCode = generateDiscountCode() // TODO: Confirm if the has been used before
        await sendEmail({
            to: data.email,
            subject: `Your Lease Request - ${discountCode}`,
            html: getLeaseRequestEmailTemplate({
                name: data.name,
                discountCode,
                propertyName: propertyTitle,
                discountAmount
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
        saveRequestToDb(data, discountCode, propertyTitle, propertyEmail, propertyId)
        return { message: 'Email sent successfully' }
    } catch (error) {
        console.error('Failed to send lease request:', error)
        return error
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

const saveRequestToDb = async (data: any, discountCode: string, propertyTitle: string, propertyEmail: string, propertyId: string) => {
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
        status: "pending"
    }
    insertDataToSupabase(payload, 'lease_request', false)
}


