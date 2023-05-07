const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Contact = require("../models/contactModel");


const getAllContact  = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json({
        title:'All contacts from controller!',
        data: contacts
    });
});

const createNewContact = asyncHandler(async (req, res) => {
        // Define validation rules
        const rules = [
            body('name')
                .notEmpty().withMessage('Name is required')
                .isString().withMessage('Name is invalid'),
            body('email')
                .notEmpty().withMessage('Email is required')
                .isEmail().withMessage('Email is invalid'),
            body('phone')
                .notEmpty().withMessage('Phone is required')
                .isMobilePhone().withMessage('Phone is invalid')
        ];
        // Run validation
        await Promise.all(rules.map(rule => rule.run(req)));
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0]['msg']);
        }

        req.body.user_id = req.user.id;
        const contact = await Contact.create(req.body);
        res.status(201).json({
            title:'created contact for '+req.body.name,
            data: contact
        });
    }
);


const updateContact = asyncHandler(async (req, res) => {
    // Define validation rules
    const rules = [
        body('name')
            .notEmpty().withMessage('Name is required')
            .isString().withMessage('Name is invalid'),
        body('email')
            .notEmpty().withMessage('Email is required')
            .isEmail().withMessage('Email is invalid'),
        body('phone')
            .notEmpty().withMessage('Phone is required')
            .isMobilePhone().withMessage('Phone is invalid')
    ];
    // Run validation
    await Promise.all(rules.map(rule => rule.run(req)));
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        throw new Error(errors.array()[0]['msg']);
    }

    const contactID = req.params.id;
    const contact = await Contact.findById(contactID);
    if (!contact){
        res.status(404);
        throw new Error(`Contact not found with ID ${contactID}`);
    }

    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Unauthorized attempt of update');
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        contactID,
        req.body,
        {new: true}
    );
    res.status(200).json({
        title:`Updated contact for ID ${contactID}`,
        data: updatedContact
    });
});

const deleteContact = asyncHandler(async (req, res) => {
    const contactID = req.params.id;
    const contact = await Contact.findById(contactID);
    if (!contact){
        res.status(404);
        throw new Error(`Contact not found with ID ${contactID}`);
    }

    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Unauthorized attempt of delete');
    }

    await Contact.deleteOne({ _id: contactID });
    res.status(200).json({
        title:`Deleted contact for ID ${contactID}`,
        data: contact
    });
});

const viewSingleContact = asyncHandler(async (req, res) => {
    const contactID = req.params.id;
    const contact = await Contact.findById(contactID);
    if (!contact){
        res.status(404);
        throw new Error(`Contact not found with ID ${req.params.id}`);
    }

    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error('Unauthorized attempt of view');
    }

    res.status(200).json({
        title:`view contact for ID ${req.params.id}`,
        data: contact
    });
})

module.exports = {getAllContact, createNewContact, updateContact, deleteContact, viewSingleContact }