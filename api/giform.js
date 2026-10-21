import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ error: "Method Not Allowed" });
  }
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (err) {
      body = {};
    }
  }

  if (!body || Object.keys(body).length === 0) {
    res.statusCode = 400;
    return res.json({ error: "Missing Request Body" });
  }

  const { name, courier, weight, dimensions, phone, island } = body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = `
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Name: </strong>${name}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Courier: </strong>${courier}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Weight: </strong>${weight}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Dimensions: </strong>${dimensions}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Phone Number: </strong>${phone}</p>
  <p style="font-family: 'Arial', sans-serif; padding: 20px; border: 1px solid #000000; margin: 0; text-align: start;"><strong>Phone Island: </strong>${island}</p>
  `;
  const mailOptions = {
    from: `Salish Shipping Co. <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: "New Pickup Request",
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    res.status(200).json({
      message:
        "Quote submitted successfully. Please expect an email from salishshippingco@gmail.com shortly.",
      success: true,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email", success: false });
  }
}
