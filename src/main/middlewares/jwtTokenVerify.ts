import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import { transform } from '../../shared/utils/transformResponse';

export default {
    name: 'jwt:tokenAuthorization',
    handler: (withRole: string[]) => (req: Request, res: Response, next: NextFunction) => {
        try {
            const public_key = fs.readFileSync('public_key.pem', 'utf8');
            const { authorization } = req.query;
            if (authorization === 'true') {
                const authHeader = req.headers.authorization;
                const token = authHeader && authHeader.split(' ')[1];
                if (!token) {
                    return res.status(401).json(transform({ id: req.body.id, params: { status: 'FAILED', err: 'Unauthorized access', errmsg: 'No token provided' }, responseCode: 'UNAUTHORIZED' }));
                }
                jwt.verify(token, public_key, (err, decoded) => {
                    if (err) {
                        return res
                            .status(403)
                            .json(transform({ id: req.body.id, params: { status: 'FAILED', err: 'Unauthorized access', errmsg: 'Token verification failed' }, responseCode: 'UNAUTHORIZED' }));
                    }
                    if (decoded && typeof decoded == 'object') {
                        if (withRole.length > 0 && !withRole.includes(decoded.role)) {
                            return res
                                .status(401)
                                .json(transform({ id: req.body.id, params: { status: 'FAILED', err: 'Unauthorized access', errmsg: 'Access denied for the user' }, responseCode: 'UNAUTHORIZED' }));
                        }
                        next();
                    }
                });
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    },
};
