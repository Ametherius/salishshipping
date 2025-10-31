import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end("Method Not Allowed");
  }
  if (!req.body) {
    res.statusCode = 400;
    return res.end("Missing Request Body");
  }

  const {
    senderOrReceiver,
    senderName,
    pickupAddress,
    pickupInstructions,
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
  } = req.body;

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
                                          <td>
                                          <h3 style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold;">Recipient Email:</h3>
                                          <p style="font-family: 'Arial', sans-serif; color: #000000; font-size: 16px; font-weight: bold; margin: 0;">${recipientEmail}</p>
                                          </td>
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

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Failed to send email" });
    } else {
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Email sent successfully" });
    }
  });
}
