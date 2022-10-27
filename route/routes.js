
const router = require("express").Router()
const userController = require("../controllers/userController")
const adminController = require("../controllers/adminController")

const {verifiedAccessToken, verifiedAdminToken} = require("./verifyTokens")


// USER ROUTES

// create user
router.post("/user/register", userController.createUser)
// login user
router.post("/user/login", userController.loginUser)
// Update User
router.put("/user/update/:id", userController.updateUser)
// Delete user
router.delete("/user/delete/:id", verifiedAdminToken, userController.deleteUser)
// Get one User
router.get("/user/get/:id", userController.getOneUser)
// Get All Users
router.get("/user/all/:id", verifiedAdminToken, userController.getAllUsers)
// Verify User
router.get("/validate", userController.confirmEmail)
// SEND PROFIT EMAIL
router.post("/email/profit", userController.sendProfitEmail)
// GENERATE HASH
router.post("/hash/generate", userController.hashPassword)


// ADMIN ROUTES

// create admin
// router.post("/admin/register", adminController.createUser)
// login admin
router.post("/admin/login", adminController.loginUser)
// Update admin
router.put("/admin/update/:id", verifiedAdminToken, adminController.updateUser)
// Delete admin
router.delete("/admin/delete/:id", verifiedAdminToken, adminController.deleteUser)


module.exports = router