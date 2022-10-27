
const emailTemplate = (resetLink, firstName) => (
    `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bittstream Admin</title>
    </head>
    <body style="background-color: rgba(0, 0, 0, 0.014);">
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 90%; margin: auto; max-width: 800px;">
            <div style="background-color: white; margin-top: 50px; padding: 20px;">
                <img style="background-color: rgba(0, 0, 0, 1); padding: 10px; border-radius: 10px; width: 50px; height: 50px; margin: 30px auto; display: block;" src="https://www.icapitalvex.com/public/assets/images/favicon/favicon.png" alt="">
                <p style="font-size: 1.4rem;">Hello ${firstName},</p>
                <p style="opacity: .7; font-size: 1.1rem;">Thanks for registering for an account on iCapitalvex! Click the button below to verify your email</p>
                <a href=${resetLink} style="text-decoration: none; text-align: center; border: none; margin: 25px auto; font-weight: bold; padding: 15px 10px; background: rgba(0, 0, 0, 1); color: white; border-radius: 5px; display: block; width: 200px;">Verify Email</a>
                <hr style="opacity: .4; margin: 50px auto;">
                <p style="text-align: center; opacity: .4;">
                101 Jefferson Dr 1st Floor, Menlo Park, CA 94025,
                United States</p>
            </div>
        </div>
    </body>
    </html>

    `
)

module.exports = emailTemplate;