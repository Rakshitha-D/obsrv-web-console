import { Request, Response, NextFunction } from 'express';
import userService from '../services/oauthUsers';

export default {
    name: 'user:update',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, user_name, email_address, ...updateInfo } = req.body;
            if (!id || !user_name || !email_address) {
                return res.json({ error: 'UserInfo with Id, user name, email address required' });
            }
            const userInfo = { id, user_name, email_address };
            const result = await userService.update(userInfo, updateInfo);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};
