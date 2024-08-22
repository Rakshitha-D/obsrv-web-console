import { Request, Response, NextFunction } from 'express';
import userService from '../services/oauthUsers';
import bcrypt from 'bcryptjs';
import { transform } from '../../shared/utils/transformResponse';

export default {
    name: 'user:update',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, email_address, password, ...rest } = req.body.request;
            const updateInfo = rest;
            if (!id || !email_address || !password) {
                return res.json({ error: 'Password and email address are required' });
            }

            const user = await userService.find({ id, email_address });

            if (!user) {
                return res.status(404).json({ error: 'USER NOT FOUND' });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
            const result = await userService.update(
                { id, email_address },
                {
                    ...updateInfo,
                    last_updated_on: new Date().toISOString(),
                },
            );
            res.status(200).json(transform({ id: req.body.id, result: { id: result.id, user_name: result.user_name } }));
        } catch (error) {
            next(error);
        }
    },
};
