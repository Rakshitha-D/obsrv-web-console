import { Response, Request, NextFunction } from 'express';
import userService from '../services/oauthUsers';
import { transform } from '../../shared/utils/transformResponse';

export default {
    name: 'user:roles:configure',
    handler: () => async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, user_name, roles } = req.body.request;
            if (!id || !user_name || !roles) {
                return res.status(400).json(
                    transform({
                        id: req.body.id,
                        params: {
                            err: 'BAD_REQUEST',
                            status: 'FAILED',
                            errmsg: 'Roles, Password and email address are required',
                        },
                        responseCode: 'BAD_REQUEST',
                    }),
                );
            }
            const user = await userService.find({ id, user_name });

            if (!user) {
                return res.status(404).json(
                    transform({
                        id: req.body.id,
                        params: {
                            err: 'USER NOT FOUND',
                            status: 'FAILED',
                            errmsg: 'User not found',
                        },
                        responseCode: 'NOT FOUND',
                    }),
                );
            }
            const result = await userService.update(
                { id, user_name },
                {
                    roles: roles,
                    last_updated_on: new Date().toISOString(),
                },
            );
            res.status(200).json(transform({ id: req.body.id, result: { id: result.id, user_name: result.user_name, roles: result.roles } }));
        } catch (error) {
            next(error);
        }
    },
};
