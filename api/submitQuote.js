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
      <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
              <td align="center">
                  <!-- Outer Container -->
                  <table width="600px" cellspacing="0" cellpadding="0" style="background-color: #eaeaea; border-radius: 10px; overflow: hidden;">
                      <!-- header -->
                      <tr>
                          <td align="center">
                              <table width="100%" cellspacing="0" cellpadding="0" border="0">
                                  <thead>
                                      <tr>
                                          <th align="center" colspan="2">
                                              <h1 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 24px; font-weight: bold; text-decoration: underline; text-align: center; padding: 10px;">New Quote Request</h1>
                                          </th>
                                      </tr>
                                  </thead>
                                  <!-- Body -->
                                   <tr>
                                      <td align="center" colspan="2">
                                          <h4 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-align: center;text-transform: uppercase;">Sender Information</h4>
                                      </td>
                                   </tr>
  
                                   <tr>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Name:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${senderName}</p>
                                          <td style="padding: 20px;">
                                              <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Email:</h3>
                                              <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${senderEmail}</p>
                                          </td>
                                      </td>
                                   </tr>
                                   <tr>
  
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Pickup Address:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${pickupAddress}</p>
                                      </td>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Pickup Instructions:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${pickupInstructions}</p>
                                      </td>
                                   </tr>
                                   <tr>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Dimensions:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${dimensions}</p>
                                      </td>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Weight:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${weight}</p>
                                      </td>
                                   </tr>
                                   <tr>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Sender Phone Number:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${senderPhone}</p>
                                      </td>
                                   </tr>
  
                                   <tr>
                                      <td align="center" colspan="2">
                                          <h4 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; text-align: center;text-transform: uppercase;">Delivery Information</h4>
                                      </td>
                                   </tr>
                                   <tr>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Recipient Name:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${recipientName}</p>
                                      </td>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Sender/Receiver:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${
                                            senderOrReceiver || "N/A"
                                          }</p>
                                      </td>
                                   </tr>
                                   <tr>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Recipient Phone Number:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${recipientPhone}</p>
                                      </td>
                                     
                                   </tr>
                                   <tr>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Delivery Instructions:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${deliveryInstructions}</p>
                                          <td>
                                              <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Delivery Address:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${deliveryAddress}</p>
                                          </td>
                                      </td>
                                   </tr>
                                   <tr>
                                          <td style="padding: 20px;">
                                          
                                      </td>
                                   </tr>
                                   <tr>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Discount Code:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${discountCode}</p>
                                      </td>
                                      <td style="padding: 20px;">
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">CAD Value:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${cadValue}</p>
                                      </td>
                                   </tr>
                              </table>
          </td>
      </tr>
    </table>
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
    res.status(200).json({ message: "Email sent successfully", success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", success: false });
  }
}
