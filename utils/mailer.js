

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({

    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    auth: {
    //    user: process.env.USER_EMAIL,
    //    user: "admin@bittstream.org",
       user: "icapitalvex@gmail.com",
    //    pass: process.env.USER_PASS
       pass: "wwnxedheeuhgubao"
    //    pass: "ic#risic#r1S"
    }

})

async function sendEmail(payload) {

    // let emailTransporter = await createTransporter();

    transporter.sendMail(payload, (err, info) => {

        if (err) {

            console.log(err, "Error sending email")

            return

        }
        console.log("SUCCESS", info)
    })
}


module.exports = sendEmail;