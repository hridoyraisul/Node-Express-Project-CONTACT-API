const asyncHandler = require('express-async-handler');
const {body, validationResult} =require('express-validator');
const User = require("../models/userModel");
const bcrypt = require('bcrypt');
const Contact = require("../models/contactModel");

const allUser = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json({
        title: 'All registered users ',
        data: users
    })
});

const registerNewUser = asyncHandler(async (req, res) => {
    try{
        const rules = [
            body('name')
                .notEmpty().withMessage('Name is required')
                .isString().withMessage('Name is invalid'),
            body('email')
                .notEmpty().withMessage('Email is required')
                .isEmail().withMessage('Email is invalid'),
            body('phone')
                .notEmpty().withMessage('Phone is required')
                .isMobilePhone().withMessage('Phone is invalid'),
            body('password')
                .notEmpty().withMessage('Password is required')
        ];
        await Promise.all(rules.map(rule => rule.run(req)));
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0]['msg']);
        }

        const { name, email, phone, password} = req.body;

        const checkAvailability = await User.findOne({ email });
        if (checkAvailability){
            res.status(400);
            throw new Error('This email is already used!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
        const user = await User.create(req.body);
        res.status(201).json({
            title: 'Registration done for user '+name,
            data: user,
        });
    } catch (e) {
        res.status(400);
        throw new Error('Something went wrong!');
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try{
        const rules = [
            body('email')
                .notEmpty().withMessage('Email is required')
                .isEmail().withMessage('Email is invalid'),
            body('password')
                .notEmpty().withMessage('Password is required')
        ];
        await Promise.all(rules.map(rule => rule.run(req)));
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400);
            throw new Error(errors.array()[0]['msg']);
        }

        const {email, password} = req.body;
        const user = await User.findOne({ email });
        if(!user){
            res.status(404);
            throw new Error(`User not found with email ${email}`);
        }

        const match = await bcrypt.compare(password, user.password);
        if (match){
            res.status(200).json({
                title: 'Logged in user successfully!',
                data: user
            })
        } else {
            res.status(403);
            throw new Error(`Password is wrong for the user ${user.name}`);
        }
    } catch (e) {
        res.status(400);
        throw new Error(`Something went wrong!`);
    }
});

const getLoggedInUser = asyncHandler(async (req, res) => {
    const user = {};
    res.status(200).json({
        title: 'Logged in information of user ',
        data: user
    })
});

const removeUser = asyncHandler(async (req, res) => {
    const userID = req.params.id;
    const user = await User.findById(userID);
    if (!user){
        res.status(404);
        throw new Error(`User not found with ID ${userID}`);
    }
    await User.deleteOne({ _id: userID });
    res.status(200).json({
        title:`Removed user for ID ${userID}`,
        data: user
    });
})

module.exports = {registerNewUser, loginUser, getLoggedInUser, allUser, removeUser}
