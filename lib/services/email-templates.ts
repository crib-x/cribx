interface EmailTemplateProps {
  name: string;
  discountCode: string;
  propertyName: string;
  discountAmount: string;
  email?: string;
  moveInDate?: Date;
  needsPickup?: boolean;
  phone?: string;

}

export function getLeaseRequestEmailTemplate({
  name,
  discountCode,
  propertyName,
  discountAmount
}: EmailTemplateProps): string {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Thank You for Your Interest!</h2>
      
      <p>Hello ${name},</p>
      
      <p>Thank you for requesting a lease at ${propertyName}. We're excited to help you find your new home!</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">Your Special Discount:</p>
        <p style="font-size: 24px; color: #2563eb; margin: 10px 0;">${discountCode}</p>
        <p style="margin: 0;">Save $${discountAmount} on your security deposit!</p>
      </div>
      
      <p>Use this code during your lease signing process to redeem your discount.</p>
      
      <p>Our leasing team will contact you shortly to discuss next steps.</p>
      
      <p>Best regards,<br>The cribX Team</p>
    </div>
  `;
}

export function getAgentLeaseRequestEmailTemplate({ propertyName, name, needsPickup, phone, email, moveInDate, discountCode}: EmailTemplateProps){
return `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h2 style="color: #2563eb;">New Lease Request Received</h2>
    
    <p>Hello,</p>
    
    <p>We have received a new lease request for your property, ${propertyName}.</p>
    
    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <p style="margin: 0; font-weight: bold;">Applicant Details:</p>
      <p style="margin: 0;">Name: ${name}</p>
      <p style="margin: 0;">Email: ${email}</p>
      <p style="margin: 0;">Phone: ${phone}</p>
      <p style="margin: 0;">Expected Move-in Date: ${moveInDate?.toLocaleDateString()}</p>
      <p style="margin: 0;">Needs Pickup: ${needsPickup ? 'Yes' : 'No'}</p>
      <p style="margin: 0;">Discount Code for Security Deposit:: ${discountCode}</p>
    </div>
    
    <p>Please review the applicant's details and contact them to proceed with the lease process.</p>
    
    <p>Best regards,<br>The cribX Team</p>
  </div>
`;
}