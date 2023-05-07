const express = require('express');
const router = express.Router();
const {allUser, registerNewUser, loginUser, getLoggedInUser,removeUser,logoutUser} = require('../controllers/userController');
const validateToken = require("../middleware/tokenHandler");

router.route("/all").get(allUser);

router.route("/register").post(registerNewUser);

router.route("/log-in").post(loginUser);

router.route("/logged-in-user").get(validateToken,getLoggedInUser);

router.route("/logout").get(logoutUser);

router.route("/remove/:id").delete(removeUser);

module.exports = router;