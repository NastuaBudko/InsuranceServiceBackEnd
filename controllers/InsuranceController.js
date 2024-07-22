import InsuranceModel from '../models/Insurance.js';
import UserModel from '../models/User.js'

export const getAll = async (req, res) => {
    try {
        const insurances = await InsuranceModel.find()
            .populate('user')
            .populate('branch')
            .populate('insuranceType')
            .exec();

        res.json(insurances);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to load insurances'
        });
    }
};

export const getOne = async (req, res) => {
    try {
        const insuranceId = req.params.id;

        const insurance = await InsuranceModel.findOne({ _id: insuranceId })
            .populate('user')
            .populate('branch')
            .populate('insuranceType')
            .exec();

        if (!insurance) {
            return res.status(404).json({
                message: 'Insurance not found'
            });
        }

        res.json(insurance);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get insurance'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const insuranceId = req.params.id;

        const doc = await InsuranceModel.findOneAndDelete({ _id: insuranceId });

        if (!doc) {
            return res.status(404).json({
                message: 'Insurance, which you want to delete, is not found'
            });
        }

        res.json({
            success: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete insurance'
        });
    }
};

export const create = async (req, res) => {
    try {
        const { insuranceSum, tariffRate, branch, insuranceType } = req.body;

        const doc = new InsuranceModel({
            insuranceSum,
            tariffRate,
            branch,
            insuranceType,
            user: req.userId
        });

        const insurance = await doc.save();

        await InsuranceModel.populate(insurance, { path: 'user' });
        await InsuranceModel.populate(insurance, { path: 'branch' });
        await InsuranceModel.populate(insurance, { path: 'insuranceType' });

        const user = await UserModel.findById(req.userId);
        if (user) {
            user.insuranceCount += 1;

            const insurancePayment = insuranceSum * tariffRate;
            let salaryPercentage;

            switch (insurance.insuranceType.type) {
                case 'vehicle':
                    salaryPercentage = 10;
                    break;
                case 'medical':
                    salaryPercentage = 5;
                    break;
                case 'house':
                    salaryPercentage = 15;
                    break;
                default:
                    salaryPercentage = 0;
            }

            user.salary += insurancePayment * (salaryPercentage / 100);
            await user.save();
        }


        res.json(insurance);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to create insurance'
        });
    }
};
