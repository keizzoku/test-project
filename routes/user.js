import { register, login, addProfile, getProfile, getProfiles } from '../controllers/user.js';
import upload from '../middleware/file-upload.js'
import auth from '../middleware/auth.js'
import { body } from 'express-validator';
import User from '../models/user.js'
import express from "express";

const router = express.Router();

router.post(
    '/register',
    [
        body('email').isEmail()
            .custom((value) => {
                return User.findOne({where: {email: value}}).then(userData => {
                    if(userData)  return Promise.reject('Email address already exist');
                })
            }),
        body('firstName').trim().notEmpty(),
        body('password').trim().isLength({ min: 5 })
    ],
    register
);

router.post(
    '/login',
    [
        body('email').isEmail(),
        body('password').trim().isLength({ min: 5 })
    ],
    login
);

router.put(
    '/profile',
    auth,
    upload.single('image'),
    [
        body('firstName').optional().trim().notEmpty(),
        body('lastName').optional().trim().notEmpty(),
        body('email').optional().isEmail(),
        body('gender').optional().isIn(['male', 'female'])
    ],
    addProfile
);

router.get(
    '/profile/:id',
    getProfile
);

router.get(
    '/profiles',
    getProfiles
);


export default router;













