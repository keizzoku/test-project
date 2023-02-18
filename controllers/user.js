import { validationResult } from 'express-validator';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function register(req, res, next) {
    const errors = validationResult(req);

    try {
        if(!errors.isEmpty()){
            const error = new Error('Validation failed, entered data is incorrect.');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        
        const { email, firstName, password } = req.body;

        const hashedPw = await bcrypt.hash(password, 12);
        
        await User.create({
            email: email,
            firstName: firstName,
            password: hashedPw
        })
        
        res.status(200).json({ msg: 'User successfuly registered!' });
    }
    catch(err) {
        next(err);
    }
};


export async function login(req, res, next) {
    const errors = validationResult(req);
    
    try {
        if(!errors.isEmpty()){
            const error = new Error('Validation failed, entered data is incorrect.');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        
        const { email, password } = req.body;
        
        const user = await User.findOne({ where: { email: email } })
        
        if(!user){
            const error = new Error('A user with this email could not found.');
            error.statusCode = 404;
            throw error;
        }
        
        const isEqual = bcrypt.compare(password, user.password);
        
        if(!isEqual){
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        
        const token = jwt.sign(
            {
                email: user.email,
                userId: user.id
            },
            process.env.SECRET,
            { expiresIn: '1h' }
        );
        
        res.status(200).json({ token: token });
        
    }
    catch(err) {
        next(err);
    }
};

export async function addProfile(req, res, next) {
    const errors = validationResult(req);
    
    try {
        if(!errors.isEmpty()){
            const error = new Error('Validation failed, entered data is incorrect.');
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        
        const profileData = req.body;
        const { userId } = req;

        if(req.file) {
            profileData.photo = req.file.filename;
        }

        const user = await User.findByPk(userId);

        if(!user){
            const error = new Error('A user with this id could not found.');
            error.statusCode = 404;
            throw error;
        }

        user.set(profileData);
        const userProfile = await user.save();
    
        res.status(200).json({ userProfile });
    }
    catch(err) {
        next(err);
    }
}

export async function getProfile(req, res, next) {    
    try {
        const { id } = req.params;

        const userProfile = await User.findByPk(id);

        if(!userProfile){
            const error = new Error('A user with this id could not found.');
            error.statusCode = 404;
            throw error;
        }
    
        res.status(200).json({ userProfile });
    }
    catch(err) {
        next(err);
    }
}

export async function getProfiles(req, res, next) {    
    const currentPage = req.query.page || 1;
    const perPage = 10;

    try {
        const profiles = await User.findAll({
            offset: (currentPage - 1) * perPage,
            limit: perPage
        })
    
        res.status(200).json({ profiles, meta: { currentPage, take: profiles.length } });
    }
    catch(err) {
        next(err);
    }
}