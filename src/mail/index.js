import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: process.env.MAILHOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPASSWORD,
  },
});

const sendMail = ({ to, kode }) => {
  const mailOptions = {
    from: "LitFinder",
    to: to,
    subject: `Lupa Password`,
    text: `Halo, berikut kode OTP kamu: ${kode}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

export default sendMail;
