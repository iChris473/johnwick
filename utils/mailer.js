

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
       user: process.env.ADMIN_EMAIL,
       pass: process.env.ADMIN_PASS
    }

})

async function sendEmail(payload) {
  transporter.sendMail(payload, (err, info) => {
    if (err) {
      console.log(err, "Error sending email");
      return;
    }
    console.log("SUCCESS", info);
  });
}


module.exports = sendEmail;