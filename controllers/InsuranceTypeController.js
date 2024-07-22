import InsuranceTypeModel from '../models/InsuranceType.js'

export const getAll = async (req, res) => {
    try {
        const insurance_types = await InsuranceTypeModel.find() 

        res.json(insurance_types)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to load insurance types'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const insuranceTypeId = req.params.id;

        const insuranceType = await InsuranceTypeModel.findOne({ _id: insuranceTypeId }); 

        if (!insuranceType) {
            return res.status(404).json({
                message: 'Insurance type not found'
            });
        }

        res.json(insuranceType);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get insurance type'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const insuranceTypeId = req.params.id;

        const doc = await InsuranceTypeModel.findOneAndDelete({ _id: insuranceTypeId });

        if (!doc) {
            return res.status(404).json({
                message: 'Insurance type, which you want to delete, is not found'
            });
        }

        res.json({
            success: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete insurance type'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new InsuranceTypeModel({
            type: req.body.type,
            name: req.body.name
        })

        const insuranceType = await doc.save()

        res.json(insuranceType)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to create insurance type'
        })
    }
}