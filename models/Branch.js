import mongoose from 'mongoose';

const BranchSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true
    },
    branchName: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

export default mongoose.model('Branch', BranchSchema)