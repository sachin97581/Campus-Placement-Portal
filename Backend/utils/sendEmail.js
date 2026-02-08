// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   await transporter.sendMail({
//     from: `"Campus Portal" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html
//   });
// };

// module.exports = sendEmail;

const nodemailer = require("nodemailer");

// create transporter ONCE (important for performance)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmail = (to, subject, html) => {
  // fire-and-forget (no await)
  transporter
    .sendMail({
      from: `"Campus Portal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    })
    .then(() => {
      console.log("Email sent to:", to);
    })
    .catch((err) => {
      console.error("Email error:", err.message);
    });
};

module.exports = sendEmail;
