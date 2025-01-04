'use server'

import { getDataFromSupabase, insertDataToSupabase } from '@/hooks/database-actions'
import { sendEmail } from '@/lib/services/email-service'
import { getContactForm } from '@/lib/services/email-templates'

interface SendMessageData {
  name: string
  email: string
  phone: string
  message: string
  propertyEmail: string
}

export async function sendPropertyMessage(data: SendMessageData) {
  try {
    await sendEmail({
      to: data.propertyEmail, 
      subject: `New Message from ${data.name}`,
      html: getContactForm({
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message
      })
    })
    console.log('data', data)
    await saveRequestToDb(data)
    return { success: true }
  } catch (error) {
    console.error('Failed to send message:', error)
    throw new Error('Failed to send message')
  }
}

export const getAllMessages = async () => {
    try {
        const data = await getDataFromSupabase('messages', true)
        return data
    } catch (error) {
        throw error
    }
}



const saveRequestToDb = async (data: any) => {
    // Get current user session
    const payload = {
        requestor_name: data.name,
        requestor_email: data.email,
        requestor_phone: data.phone,
        message: data.message,
        property_id: data?.propertyId,
        receiver_email: data.propertyEmail,
        property_title: data?.propertyTitle,

    }
   await  insertDataToSupabase(payload, 'messages', false)
}