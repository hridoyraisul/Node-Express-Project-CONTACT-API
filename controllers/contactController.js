const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");


const getAllContact  = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json({
        title:'All contacts from controller!',
        data: contacts
    });
});

const createNewContact = asyncHandler(async (req, res) => {
        const {name, email, phone, password} = req.body;
        if (!name || !email || !phone || !password){
            res.status(400);
            throw new Error('name, email, phone, password fields are mandatory!');
        }
        const contact = await Contact.create({
            name,
            email,
            phone,
            password
        });
        res.status(201).json({
            title:'created contact for '+req.body.name,
            data: contact
        });
    }
);


const updateContact = asyncHandler(async (req, res) => {
    const contactID = req.params.id;
    const contact = await Contact.findById(contactID);
    if (!contact){
        res.status(404);
        throw new Error(`Contact not found with ID ${contactID}`);
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
    res.status(200).json({
        title:`view contact for ID ${req.params.id}`,
        data: contact
    });
})

module.exports = {getAllContact, createNewContact, updateContact, deleteContact, viewSingleContact }