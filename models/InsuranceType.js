import mongoose from 'mongoose';

const InsuranceTypeSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export default mongoose.model('InsuranceType', InsuranceTypeSchema)