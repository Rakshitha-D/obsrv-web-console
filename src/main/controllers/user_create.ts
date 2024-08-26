import { Request, Response, NextFunction } from 'express';
import userService from '../services/oauthUsers';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';
import { transform } from '../../shared/utils/transformResponse';

export default {
    name: 'user:create',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userRequest = req.body.request;
            if (!userRequest.user_name || !userRequest.email_address || !userRequest.password) {
                return res.json({ error: 'UserName, password and email address are required fields' });
            }
            const { password } = userRequest;
            userRequest.password = await bcrypt.hash(password, 12);
            if (userRequest.mobile_number) {
                const { country_code, number } = userRequest.mobile_number;
                userRequest.mobile_number = `${country_code as string}_${number as string}`;
            }
            const userIdentifier = { id: v4(), created_on: new Date().toISOString() };
            const userInfo = { ...userRequest, ...userIdentifier };
            const result = await userService.save(userInfo);
            res.status(200).json(transform({ id: req.body.id, result: { id: result.id, email_address: result.email_address } }));
        } catch (error) {
            next(error);
        }
    },
};
