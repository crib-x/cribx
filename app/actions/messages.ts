'use server'

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
    return { success: true }
  } catch (error) {
    console.error('Failed to send message:', error)
    throw new Error('Failed to send message')
  }
}
