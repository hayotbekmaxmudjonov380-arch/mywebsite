import { Resend } from 'resend'

function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

export interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const resend = getResend()
    
    await resend.emails.send({
      from: options.from || 'ITSHOPPING <noreply@itshopping.uz>',
      to: options.to,
      subject: options.subject,
      html: options.html,
    })
    
    console.log(`Email sent to ${options.to}`)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

export function generateOrderConfirmationEmail(orderId: string, productName: string, downloadLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0066cc;">ITSHOPPING - Buyurtma tasdiqlandi</h1>
      
      <p>Assalomu alaykum!</p>
      
      <p>Sizning buyurtmangiz muvaffaqiyatli qabul qilindi.</p>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Buyurtma ma'lumotlari:</h3>
        <p><strong>Buyurtma ID:</strong> ${orderId}</p>
        <p><strong>Mahsulot:</strong> ${productName}</p>
      </div>
      
      <p>Faylni yuklab olish uchun quyidagi tugmani bosing:</p>
      
      <a href="${downloadLink}" style="display: inline-block; background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
        Faylni yuklab olish
      </a>
      
      <p style="margin-top: 20px; font-size: 12px; color: #666;">
        Agar tugma ishlamasa, quyidagi havolani brauzeringizga kiriting:<br>
        <a href="${downloadLink}">${downloadLink}</a>
      </p>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      
      <p style="font-size: 12px; color: #666;">
        ITSHOPPING - Raqamli mahsulotlar marketplace'i<br>
        <a href="https://itshopping.uz">https://itshopping.uz</a>
      </p>
    </body>
    </html>
  `
}

export function generateWelcomeEmail(firstName: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0066cc;">ITSHOPPING ga xush kelibsiz!</h1>
      
      <p>Assalomu alaykum, ${firstName}!</p>
      
      <p>Sizning ITSHOPPING akkauntingiz muvaffaqiyatli yaratildi.</p>
      
      <p>Endi siz quyidagi imkoniyatlarga ega bo'lasiz:</p>
      
      <ul>
        <li>Raqamli mahsulotlarni sotib olish</li>
        <li>Litsenziyalarni boshqarish</li>
        <li>Fayllarni yuklab olish</li>
      </ul>
      
      <a href="https://itshopping.uz" style="display: inline-block; background-color: #0066cc; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; margin-top: 20px;">
        Do'konga o'tish
      </a>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      
      <p style="font-size: 12px; color: #666;">
        ITSHOPPING - Raqamli mahsulotlar marketplace'i<br>
        <a href="https://itshopping.uz">https://itshopping.uz</a>
      </p>
    </body>
    </html>
  `
}

export function generateContactFormEmail(name: string, email: string, subject: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #0066cc;">ITSHOPPING - Yangi xabar</h1>
      
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Yuboruvchi ma'lumotlari:</h3>
        <p><strong>Ism:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mavzu:</strong> ${subject}</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Xabar:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </div>
      
      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      
      <p style="font-size: 12px; color: #666;">
        ITSHOPPING - Raqamli mahsulotlar marketplace'i<br>
        <a href="https://itshopping.uz">https://itshopping.uz</a>
      </p>
    </body>
    </html>
  `
}
