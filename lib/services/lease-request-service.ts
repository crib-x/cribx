import { createClient } from '../supabase/client'
import { nanoid } from 'nanoid'
import { sendEmail } from './email-service'

interface LeaseRequest {
  propertyId: string
  name: string
  email: string
  phone: string
  moveInDate: string
  message: string
}

export const leaseRequestService = {
  async submitRequest(request: LeaseRequest) {
    const supabase = createClient()
    const requestNumber = nanoid(10)

    // Store the request in the database
    const { data, error } = await supabase
      .from('lease_requests')
      .insert([
        {
          request_number: requestNumber,
          property_id: request.propertyId,
          name: request.name,
          email: request.email,
          phone: request.phone,
          move_in_date: request.moveInDate,
          message: request.message,
          status: 'pending'
        }
      ])
      .select()
      .single()

    if (error) throw error

    // Send email to property manager
    await sendEmail({
      to: data.property.contact.email,
      subject: `New Lease Request - ${requestNumber}`,
      html: `
        <h2>New Lease Request</h2>
        <p><strong>Request Number:</strong> ${requestNumber}</p>
        <p><strong>Property:</strong> ${data.property.title}</p>
        <p><strong>From:</strong> ${request.name}</p>
        <p><strong>Email:</strong> ${request.email}</p>
        <p><strong>Phone:</strong> ${request.phone}</p>
        <p><strong>Desired Move-in Date:</strong> ${request.moveInDate}</p>
        <p><strong>Message:</strong></p>
        <p>${request.message}</p>
      `
    })

    // Send confirmation email to requester
    await sendEmail({
      to: request.email,
      subject: `Lease Request Confirmation - ${requestNumber}`,
      html: `
        <h2>Your Lease Request Has Been Received</h2>
        <p>Thank you for your interest in ${data.property.title}.</p>
        <p><strong>Your Request Number:</strong> ${requestNumber}</p>
        <p>We will review your request and get back to you shortly.</p>
        <p><strong>Property Details:</strong></p>
        <p>${data.property.title}</p>
        <p>${data.property.address}</p>
        <p><strong>Your Information:</strong></p>
        <p>Name: ${request.name}</p>
        <p>Email: ${request.email}</p>
        <p>Phone: ${request.phone}</p>
        <p>Desired Move-in Date: ${request.moveInDate}</p>
      `
    })

    return {
      requestNumber,
      ...data
    }
  }
}