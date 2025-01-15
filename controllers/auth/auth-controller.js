import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName, email, password: hashedPassword
        });
        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Registration successful",
            data: newUser
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
};

export const login = async (req, res) => {
    const { userName, email, password } = req.body;
    try {
        // login logic here
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
};