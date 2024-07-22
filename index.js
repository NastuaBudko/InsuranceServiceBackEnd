import express from "express";
import mongoose from "mongoose";
import cors from "cors"

import { UserController, InsuranceController, InsuranceTypeController, BranchController} from './controllers/index.js'

mongoose.connect('mongodb+srv://NastuaBudko:123www@studydatabase.5vrpesz.mongodb.net/InsuranceService?retryWrites=true&w=majority&appName=StudyDataBase')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error: ', err))

const app = express()

app.use(express.json());

app.use(cors());

app.post('/auth/login', UserController.login)
app.post('/auth/register', UserController.register)
app.get('/auth/me', UserController.getMe)

app.get('/insurances', InsuranceController.getAll)
app.get('/insurances/:id', InsuranceController.getOne)
app.post('/insurances', InsuranceController.create)
app.delete('/insurances/:id', InsuranceController.remove)

app.get('/branches', BranchController.getAll)
app.get('/branches/:id', BranchController.getOne)
app.post('/branches', BranchController.create)
app.delete('/branches/:id', BranchController.remove)

app.get('/insurance-types', InsuranceTypeController.getAll)
app.get('/insurance-types/:id', InsuranceTypeController.getOne)
app.post('/insurance-types', InsuranceTypeController.create)
app.delete('/insurance-types/:id', InsuranceTypeController.remove)

app.listen(process.env.PORT || 5555, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')

})