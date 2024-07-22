import express from "express";
import mongoose from "mongoose";
import cors from "cors"

mongoose.connect('mongodb+srv://NastuaBudko:123www@studydatabase.5vrpesz.mongodb.net/InsuranceService?retryWrites=true&w=majority&appName=StudyDataBase')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error: ', err))

const app = express()

app.use(express.json());

app.use(cors());

app.listen(process.env.PORT || 5555, (err) => {
    if (err) {
        return console.log(err)
    }
    console.log('Server OK')

})