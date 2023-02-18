import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    try {
        const authHeader = req.get('Authorization');
        if(!authHeader){
            const error = new Error('Authorization failed');
            error.statusCode = 401;
            throw error;
        }

        const token = authHeader.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET);

        if(!decodedToken){
            const error = new Error('Authorization failed');
            error.statusCode = 401;
            throw error;
        }

        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        next(err);
    }
}
