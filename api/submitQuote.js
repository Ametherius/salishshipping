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
    senderOrReceiver,
    senderName,
    pickupAddress,
    specialPickupInstructions,
    senderEmail,
    dimensions,
    weight,
    senderPhone,
    recipientName,
    deliveryAddress,
    deliveryInstructions,
    cadValue,
    recipientPhone,
    discountCode,
  } = body;

  // Use specialPickupInstructions or pickupInstructions
  const pickupInstructions = specialPickupInstructions || "";

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const htmlContent = `
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Sender or Reciever: </strong>${senderOrReceiver}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Sender Name: </strong>${senderName}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Sender Email: </strong>${senderEmail}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Sender Phone: </strong>${senderPhone}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Weight (Pounds): </strong>${weight}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Dimensions (L x W x H): </strong>${dimensions}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Pickup Instructions: </strong>${pickupInstructions}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Pickup Address: </strong>${pickupAddress}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Recipient Name: </strong>${recipientName}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Recipient Phone: </strong>${recipientPhone}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Discount Code: </strong>${discountCode}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>CAD Value: </strong>${cadValue}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Delivery Instructions: </strong>${deliveryInstructions}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Delivery Address: </strong>${deliveryAddress}</p>
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
