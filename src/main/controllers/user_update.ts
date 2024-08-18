import { Request, Response, NextFunction } from 'express';
import userService from '../services/oauthUsers';

export default {
    name: 'user:update',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, user_name, email_address, ...updateInfo } = req.body;
            const userInfo = { id, user_name, email_address };

            if (!userInfo) {
                return res.json({ error: 'UserInfo with Id, user name, email address required' });
            }

            const result = userService.update(userInfo, updateInfo);
            res.json(result);
        } catch (error) {
            next(error);
        }
    },
};
