import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js'

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const doc = new UserModel({
            email: req.body.email,
            name: req.body.name,
            lastName: req.body.lastName,
            middleName: req.body.middleName,
            phoneNumber: req.body.phoneNumber,
            branch: req.body.branch,
            passwordHash: hash
        })

        const user = await doc.save()

        await UserModel.populate(user, { path: 'branch' });

        const token = jwt.sign({
            _id: user._id
        },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to register'
        })
    }
}

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email })

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Incorrect login or password'
            })
        }

        const token = jwt.sign({
            _id: user._id
        },
            process.env.SECRET_KEY,
            {
                expiresIn: '30d'
            })

        const { passwordHash, ...userData } = user._doc

        res.json({
            ...userData,
            token
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to login'
        })
    }
}

export const getMe = async (req, res) => {
    try {

        const user = await UserModel.findById(req.userId).populate('branch')

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }
        const { passwordHash, ...userData } = user._doc


        res.json(userData)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Access denied'
        })
    }
}