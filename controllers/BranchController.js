import BranchModel from '../models/Branch.js'

export const getAll = async (req, res) => {
    try {
        const branches = await BranchModel.find()

        res.json(branches)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to load branches'
        })
    }
}

export const getOne = async (req, res) => {
    try {
        const branchId = req.params.id;

        const branch = await BranchModel.findOne({ _id: branchId });

        if (!branch) {
            return res.status(404).json({
                message: 'Branch not found'
            });
        }

        res.json(Branch);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to get branch'
        });
    }
};

export const remove = async (req, res) => {
    try {
        const branchId = req.params.id;

        const doc = await BranchModel.findOneAndDelete({ _id: branchId });

        if (!doc) {
            return res.status(404).json({
                message: 'Branch, which you want to delete, is not found'
            });
        }

        res.json({
            success: true
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Failed to delete branch'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new BranchModel({
            branch: req.body.branch,
            branchName: req.body.branchName,
            adress: req.body.adress,
            phoneNumber: req.body.phoneNumber
        })

        const branch = await doc.save()

        res.json(branch)

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Failed to create branch'
        })
    }
}