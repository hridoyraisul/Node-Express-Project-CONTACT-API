const express = require('express');
const router = express.Router();
const {getAllContact, createNewContact, updateContact, deleteContact, viewSingleContact } = require('../controllers/contactController');
const validateToken = require("../middleware/tokenHandler");


router.use(validateToken);

router.route("/all").get(getAllContact);
router.route("/create").post(createNewContact);
router.route("/update/:id").put(updateContact);
router.route("/delete/:id").delete(deleteContact);
router.route("/single/:id").get(viewSingleContact);

module.exports = router;