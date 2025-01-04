'use server'
import nodemailer from 'nodemailer';


interface EmailOptions {
  to: string
  subject: string
  html: string
}


const transporter = nodemailer.createTransport({
  host: 'smtp.zoho.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  },
});

export async function sendEmail({ to, subject, html }: EmailOptions) {
  const mailOptions = {
    from: process.env.SMTP_SENDER,
    to: 'affulisaac736@gmail.com',
    // to,
    subject,
    html,
    bcc: 'affulisaac736@gmail.com'
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return { success: true, message: info.response };
  } catch (error) {
    return error
  }
}