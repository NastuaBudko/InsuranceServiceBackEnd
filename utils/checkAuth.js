import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
    console.log(token)

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)

            req.userId = decoded._id

            next();
        } catch (err) {
            console.log(err)
            return res.status(403).json({
                message: 'Access denied'
            })
        }

    }
    else {
        console.log(8)
        return res.status(403).json({
            message: 'Access denied'
        })
    }
}