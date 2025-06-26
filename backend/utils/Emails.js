const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.PASSWORD, // App Password here
  },
  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendMail = async (receiverEmail, subject, body) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL, // Sender's email address
      to: receiverEmail, // Receiver's email address
      subject: subject, // Subject of the email
      html: body, // Email content
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
