import { Response, Request, NextFunction } from 'express';
import userService from '../services/oauthUsers';
import { transform } from '../../shared/utils/transformResponse';

export default {
    name: 'user:status',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, email_address, status } = req.body.request;
            if (!id || !email_address) {
                return res.json({ error: 'Password and email address are required' });
            }
            const user = await userService.find({ id, email_address });

            if (!user) {
                return res.status(404).json({ error: 'USER NOT FOUND' });
            }
            const result = await userService.update(
                { id, email_address },
                {
                    status: status,
                    last_updated_on: new Date().toISOString(),
                },
            );
            res.status(200).json(transform({ id: req.body.id, result: { id: result.id, user_name: result.user_name, status: result.status } }));
        } catch (error) {
            next(error);
        }
    },
};
