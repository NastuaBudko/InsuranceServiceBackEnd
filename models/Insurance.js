import mongoose from 'mongoose';

const InsuranceSchema = new mongoose.Schema({
    insuranceSum: {
        type: Number,
        required: true
    },
    tariffRate: {
        type: Number,
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Branch',
        required: true
    },
    insuranceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InsuranceType',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {
    timestamps: true
})

export default mongoose.model('Insurance', InsuranceSchema)