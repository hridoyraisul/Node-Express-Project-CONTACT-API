const express = require('express');
const router = express.Router();
const {allUser, registerNewUser, loginUser, getLoggedInUser,removeUser} = require('../controllers/userController');
const {deleteContact} = require("../controllers/contactController");

router.route("/all").get(allUser);

router.route("/register").post(registerNewUser);

router.route("/log-in").post(loginUser);

router.route("/logged-in-user").get(getLoggedInUser);

router.route("/remove/:id").delete(removeUser);

module.exports = router;