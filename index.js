import express from "express";
import mongoose from "mongoose";
import cors from "cors"

import { insuranceCreateValidation, loginValidation, registerValidation } from "./validations.js";

import { checkAuth, handleValidationErrors } from './utils/index.js'

import { UserController, InsuranceController, InsuranceTypeController, BranchController} from './controllers/index.js'

mongoose.connect('mongodb+srv://NastuaBudko:123www@studydatabase.5vrpesz.mongodb.net/InsuranceService?retryWrites=true&w=majority&appName=StudyDataBase')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error: ', err))

const app = express()

app.use(express.json());

app.use(cors());

app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

app.get('/insurances', InsuranceController.getAll)
app.get('/insurances/:id', InsuranceController.getOne)
app.post('/insurances', checkAuth, insuranceCreateValidation, handleValidationErrors, InsuranceController.create)
app.delete('/insurances/:id',checkAuth, InsuranceController.remove)

app.get('/branches', BranchController.getAll)
app.get('/branches/:id', BranchController.getOne)
app.post('/branches', checkAuth, handleValidationErrors, BranchController.create)
app.delete('/branches/:id', checkAuth,  BranchController.remove)

app.get('/insurance-types', InsuranceTypeController.getAll)
app.get('/insurance-types/:id', InsuranceTypeController.getOne)
app.post('/insurance-types', checkAuth,  handleValidationErrors, InsuranceTypeController.create)
app.delete('/insurance-types/:id', checkAuth,  InsuranceTypeController.remove)

app.listen(process.env.PORT || 5555, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')

})