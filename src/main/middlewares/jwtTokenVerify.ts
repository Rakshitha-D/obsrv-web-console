import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import CONFIG from '../../shared/resources/appConfig';

export default {
    name: 'jwt:tokenAuthorization',
    handler: (withRole: string[]) => (req: Request, res: Response, next: NextFunction) => {
        try {
            if (CONFIG.IS_RBAC_ENABLED === 'true') {
                const authHeader = req.headers.authorization;
                const token = authHeader && authHeader.split(' ')[1];
                if (!token) {
                    return res.status(401).json({ msg: 'No token provided' });
                }
                jwt.verify(token, CONFIG.JWT_USER_AUTHORIZATION_SECRET as string, (err, decoded) => {
                    if (err) {
                        return res.status(403).json({ msg: 'Token verification failed' });
                    }
                    if (decoded !== null && typeof decoded == 'object') {
                        if (withRole.length > 0 && !withRole.includes(decoded.role)) {
                            return res.status(401).json({ msg: 'Unauthorized access' });
                        }
                        next();
                    }
                });
                // const decoded = jwt.verify(token, CONFIG.JWT_USER_AUTHORIZATION_SECRET as string);
                // if (decoded !== null && typeof decoded == 'object') {
                //     const userRole = decoded.role;
                //     if (requiredRole === userRole) {
                //         console.log('user verified');
                //     }
                // }
                // next();
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    },
};
