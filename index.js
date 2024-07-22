import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' assert { type: 'json' };

import { insuranceCreateValidation, loginValidation, registerValidation } from "./validations.js";

import { checkAuth, handleValidationErrors } from './utils/index.js'

import { UserController, InsuranceController, InsuranceTypeController, BranchController} from './controllers/index.js'

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error: ', err))

const app = express()

app.use(express.json());

app.use(cors());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Auth routes
app.post('/auth/login', loginValidation, UserController.login)
app.post('/auth/register', registerValidation, UserController.register)
app.get('/auth/me', checkAuth, UserController.getMe)

// Insurance routes
app.get('/insurances', InsuranceController.getAll)
app.get('/insurances/:id', InsuranceController.getOne)
app.post('/insurances', checkAuth, insuranceCreateValidation, handleValidationErrors, InsuranceController.create)
app.delete('/insurances/:id',checkAuth, InsuranceController.remove)

// Branch routes
app.get('/branches', BranchController.getAll)
app.get('/branches/:id', BranchController.getOne)
app.post('/branches', checkAuth, handleValidationErrors, BranchController.create)
app.delete('/branches/:id', checkAuth,  BranchController.remove)

// Insurance Type routes
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