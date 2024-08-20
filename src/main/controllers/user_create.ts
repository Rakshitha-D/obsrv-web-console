import { Request, Response, NextFunction } from 'express';
import userService from '../services/oauthUsers';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

export default {
    name: 'user:create',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRequestBody = req.body.request;
            if (!userRequestBody.user_name || !userRequestBody.email_address || !userRequestBody.password) {
                return res.json({ error: 'UserName, password and email address are required fields' });
            }
            const { password } = req.body.request;
            userRequestBody.password = await bcrypt.hash(password, 12);
            const userIdentifier = { id: v4(), created_on: new Date().toISOString() };
            const userInfo = { ...userRequestBody, ...userIdentifier };
            const result = await userService.save(userInfo);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};
