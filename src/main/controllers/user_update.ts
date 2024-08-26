import { Request, Response, NextFunction } from 'express';
import userService from '../services/oauthUsers';
import bcrypt from 'bcryptjs';
import { transform } from '../../shared/utils/transformResponse';
import _ from 'lodash';

export default {
    name: 'user:update',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, user_name, email_address, provider, ...updateInfo } = req.body.request;
            if (!id || !user_name) {
                return res.status(400).json({ error: 'ID and User name are required' });
            }
            if (_.isEmpty(updateInfo)) {
                return res.status(400).json({ error: 'Atleast one field is required to update' });
            }

            if (email_address || provider) {
                return res.status(400).json({ error: "Can't update User Name, email address or provider" });
            }
            const user = await userService.find({ id, user_name });

            if (!user) {
                return res.status(404).json({ error: 'USER NOT FOUND' });
            }

            if (updateInfo.password) {
                updateInfo.password = await bcrypt.hash(updateInfo.password, 12);
            }
            const result = await userService.update(
                { id, user_name },
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
