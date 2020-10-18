const express = require('express')
const router = express.Router()

const{
    registerController,
    activationController,
    SignInController
} = require("../controllers/auth.controller.js")

const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator
} = require('../helpers/valid')


router.post('/register',
    validSign,
    registerController)

router.post('/activation', activationController)
router.post('/login',validLogin,SignInController)

module.exports = router
