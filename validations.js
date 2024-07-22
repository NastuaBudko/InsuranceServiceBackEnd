import { body } from 'express-validator'

export const registerValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('name', 'Enter your name').isLength({ min: 3 }).isString(),
    body('lastName', 'Enter your last name').isLength({ min: 3 }).isString(),
    body('middleName', 'Enter your middle name').isLength({ min: 3 }).isString(),
    body('phoneNumber', 'Enter your phone number').isLength({ min: 10 }),
    body('branch', 'Choose a branch where you work').isString()
]

export const loginValidation = [
    body('email', 'Invalid email').isEmail(),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 })
]

export const insuranceCreateValidation = [
    body('insuranceSum', 'Enter an amount you want to insure (from 10 000 to 2 000 000)')
        .isNumeric()
        .custom(value => {
            if (value < 10000 || value > 2000000) {
                throw new Error('Insurance amount must be from 10 000 to 2 000 000');
            }
            return true;
        }),
    body('tariffRate', 'Enter a tariff rate (from 0.1 to 10)')
        .isNumeric()
        .custom(value => {
            if (value < 0.1 || value > 10) {
                throw new Error('Tariff rate must be from 0.1 to 10');
            }
            return true;
        }),
    body('branch', 'Choose a branch where you apply for insurance').isString(),
    body('insuranceType', 'Choose insurance type').isString()
];
