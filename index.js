
require('dotenv').config()
const express = require('express')
const app = express()
require("./models/db");
const cors = require("cors")

// app.enable('trust proxy')

// app.use(function(request, response, next) {

//     if (process.env.NODE_ENV != 'development' && !request.secure) {
//        return response.redirect("https://" + request.headers.host + request.url);
//     }

//     next();
// })

app.use(cors())

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// server your css as static
app.use('/public', express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

const router = require("./route/routes")

// ROUTES FOR THE API CONTROLLERS

app.use("/api", router)

// index route for home page
app.get("/", (req, res) => res.render("./pages/index"))

// Tour route for Dashboard page
app.get("/dashboard", (req, res) => res.render("./pages/dashboard"))

// register route for Register page
app.get("/register", (req, res) => res.render("./pages/register"))

// login route for login page
app.get("/login", (req, res) => res.render("./pages/login"))

// Profile route for profile page
app.get("/profile", (req, res) => res.render("./pages/profile"))

// Logout route for all pages
app.get("/logout", (req, res) => res.render("./pages/logout"))

// Withdraw route for all pages
app.get("/withdraw", (req, res) => res.render("./pages/withdraw"))

// Invest route for all pages
app.get("/ticket", (req, res) => res.render("./pages/ticket"))

// Plans route for all pages
app.get("/plans", (req, res) => res.render("./pages/plans"))

// Procesing route for all pages
app.get("/process", (req, res) => res.render("./pages/process"))

// Email route for all pages
app.get("/emailer", (req, res) => res.render("./pages/emailer"))
// Email route for all pages
app.get("/confirmed", (req, res) => res.render("./pages/confirm"))



// ROUTES FOR THE ADMIN PAGES

// Home Route
app.get("/admin", (req, res) => res.render("./admin/index"))
// User Route
app.get("/admin/users", (req, res) => res.render("./admin/users"))
// Work Route
app.get("/admin/works", (req, res) => res.render("./admin/works"))
// Add Work Route
app.get("/admin/addwork", (req, res) => res.render("./admin/addwork"))
// Edit Work Route
app.get("/admin/editwork", (req, res) => res.render("./admin/editWork"))
// Password Work Route
app.get("/admin/password", (req, res) => res.render("./admin/password"))
// EMail Work Route
app.get("/admin/email", (req, res) => res.render("./admin/email"))
// LOGIN Work Route
app.get("/admin/login", (req, res) => res.render("./admin/login"))
// This User Route
app.get("/admin/thisuser", (req, res) => res.render("./admin/thisuser"))
// Generate Coupon Route
app.get("/admin/coupon", (req, res) => res.render("./admin/coupon"))



const port = process.env.PORT || 1400;

app.listen(port, () => console.log(`Backend running on ${port}`));