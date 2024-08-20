import { Request, Response, NextFunction } from 'express';
import userService from '../services/oauthUsers';
import bcrypt from 'bcryptjs';

export default {
    name: 'user:update',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email_address, password } = req.body.request;
            const updateInfo = req.body.request.updateInfo;
            if (updateInfo.password) {
                return res.json({ error: 'Password can not be updated' });
            }
            if (!email_address || !password) {
                return res.json({ error: 'Password and email address are required' });
            }

            const user = await userService.find({ email_address });

            if (!user) {
                return res.status(404).json({ error: 'USER NOT FOUND' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const result = await userService.update({ email_address }, updateInfo);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    },
};
