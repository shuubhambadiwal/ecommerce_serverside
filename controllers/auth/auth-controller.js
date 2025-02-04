import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';

// For register user
export const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;
    //register logic here
    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.json({
                success: false,
                message: "User already exists with the same email"
            });
        }
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

// For login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if(!checkUser) return res.json({ success: false, message: "User does not exists"  });
        
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) return res.json({ success: false, message: "Invalid Password"});

        const token = jwt.sign({id: checkUser._id, role : checkUser.role, email: checkUser.email },'CLIENT_SECRET_KEY',{expiresIn : '60m'});
        
        res.cookie('token', token, { httpOnly: true, secure : false }).json({
            success: true,
            message: "Login successful",
            user : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id
            },
        });
        // login logic here
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occurred"
        });
    }
};

// For logout user

export const logoutUser = async (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logout successful"
    });
};


//Auth controller

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) 
        return res.status(401).json({
            success: false,
            message: "User not authenticated"
        }) 
        try {
            const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "User not authenticated"
            });
        }  
};