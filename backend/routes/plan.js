const express = require("express")
const mongoose = require("mongoose")
const login_verif = require("../middlewares/login_verif.js")

const router = express.router()

router.post("createplan")

module.exports = router