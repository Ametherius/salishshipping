import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ error: "Method Not Allowed" });
  }

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  // Parse body - Vercel automatically parses JSON, but handle form-encoded too
  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // If not JSON, it might be form-encoded
      body = {};
    }
  }

  if (!body || Object.keys(body).length === 0) {
    res.statusCode = 400;
    return res.json({ error: "Missing Request Body" });
  }

  const {
    frSenderName,
    frPickupAddress,
    frPickupInstructions,
    frSenderEmail,
    frDimensions,
    frWeight,
    frSenderPhone,
    frRecipientName,
    frDeliveryAddress,
    frDeliveryInstructions,
    frRecipientPhone,
    frDiscountCode,
  } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Nom de l'expéditeur: </strong>${frSenderName}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Adresse de Prise en Charge: </strong>${frPickupAddress}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Instructions de Collecte: </strong>${frPickupInstructions}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Adresse courriel de l'expéditeur: </strong>${frSenderEmail}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Dimensions (L x W x H): </strong>${frDimensions}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Poids (en Livres): </strong>${frWeight}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Numéro de Téléphone de l'Expéditeur: </strong>${frSenderPhone}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Nom du Destinataire: </strong>${frRecipientName}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Adresse de Livraison: </strong>${frDeliveryAddress}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Instructions de Livraison: </strong>${frDeliveryInstructions}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Numéro de Téléphone du Destinataire: </strong>${frRecipientPhone}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Code Promo: </strong>${frDiscountCode}</p>
  `;

  const mailOptions = {
    from: `Salish Shipping Co. <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Quote Request",
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({
      message:
        "Quote submitted successfully. Please expect an email from salishshippingco@gmail.com shortly",
      success: true,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", success: false });
  }
}
