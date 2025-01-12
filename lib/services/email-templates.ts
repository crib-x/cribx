interface EmailTemplateProps {
  name: string;
  discountCode: string;
  propertyName: string;
  discountAmount: string;
  email?: string;
  moveInDate?: Date;
  needsPickup?: boolean;
  phone?: string;
  message?: string;
  propertyUrl?: string;
}

export function getLeaseRequestEmailTemplate({
  name,
  discountCode,
  propertyName,
  discountAmount,
  propertyUrl,
}: EmailTemplateProps): string {
  return `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #374151;">
  <!-- Header -->
  <div style="text-align: center; margin-bottom: 32px;">
    <h1 style="color: #059669; margin: 0; font-size: 24px;">Welcome to CribX!</h1>
    <p style="color: #6B7280; margin-top: 8px;">Your journey to a new home begins here</p>
  </div>

  <!-- Main Content -->
  <div style="margin-bottom: 32px;">
    <p>Hello ${name},</p>
    
    <p>Thank you for choosing CribX for your accommodation needs! We're thrilled you've taken the first step toward finding your perfect space at ${propertyName}.</p>
  </div>

  <!-- Discount Box -->
  <div style="background-color: #ECFDF5; border: 1px solid #059669; padding: 24px; border-radius: 12px; margin: 32px 0; text-align: center;">
    <h2 style="color: #059669; margin: 0 0 16px 0; font-size: 20px;">Your Exclusive Discount Code</h2>
    <div style="background-color: white; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
      <p style="font-size: 28px; color: #059669; font-weight: bold; margin: 0; letter-spacing: 2px;">${discountCode}</p>
    </div>
    <p style="margin: 0; color: #374151;">Save <strong>$${discountAmount}</strong> on your security deposit!</p>
  </div>

  <!-- Next Steps -->
  <div style="margin: 32px 0;">
    <h3 style="color: #374151; margin-bottom: 16px;">Next Steps:</h3>
    <ol style="padding-left: 24px; margin: 0;">
      <li style="margin-bottom: 12px;">Keep this email for your records</li>
      <li style="margin-bottom: 12px;">Complete your application on the property website${
        propertyUrl
          ? ` (<a href="${propertyUrl}" style="color: #059669; text-decoration: none;">click here</a>)`
          : ""
      }</li>
      <li style="margin-bottom: 12px;">Use your discount code during the lease signing process</li>
    </ol>
  </div>

  <!-- Contact Section -->
  <div style="background-color: #F3F4F6; padding: 24px; border-radius: 12px; margin: 32px 0;">
    <h3 style="color: #374151; margin: 0 0 16px 0;">Need Assistance?</h3>
    <p style="margin: 0;">Our team is here to help! Contact us at <a href="mailto:support@cribx.com" style="color: #059669; text-decoration: none;">support@cribx.com</a></p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; border-top: 1px solid #E5E7EB; padding-top: 32px; margin-top: 32px;">
    <p style="margin: 0 0 16px 0;">Thank you for trusting CribX to simplify your housing journey. We're here to make finding your next home seamless and rewarding!</p>
    <div style="color: #6B7280; font-size: 14px;">
      <p style="margin: 0;">© ${new Date().getFullYear()} CribX</p>
    </div>
  </div>
</div>
`;
}

export function getAgentLeaseRequestEmailTemplate({
  propertyName,
  name,
  needsPickup,
  phone,
  email,
  moveInDate,
  discountCode,
}: EmailTemplateProps) {
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
      <p style="margin: 0;">Needs Pickup: ${needsPickup ? "Yes" : "No"}</p>
      <p style="margin: 0;">Discount Code for Security Deposit: ${discountCode}</p>
    </div>
    
    <p>Please review the applicant's details and contact them to proceed with the lease process.</p>
    
    <p>Best regards,<br>The cribX Team</p>
  </div>
`;
}

export function getContactForm({
  name,
  phone,
  email,
  message,
}: Partial<EmailTemplateProps>) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Message</h2>
      
      <p>Hello,</p>
      
      <p>You have received new enquiry from ${name}.</p>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0; font-weight: bold;">Message Details:</p>
        <p style="margin: 0;">Name: ${name}</p>
        <p style="margin: 0;">Email: ${email}</p>
        <p style="margin: 0;">Phone: ${phone}</p>
        <p style="margin: 0;">Message: ${message}</p>
       
      </div>
      
    </div>
  `;
}
