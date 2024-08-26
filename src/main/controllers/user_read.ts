import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import userService from '../services/oauthUsers';
import { transform } from '../../shared/utils/transformResponse';

export default {
    name: 'user:read',
    handler: () => async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = _.get(request, ['body', 'request']);
            const result = await userService.find(user);
            if (!result) {
                response.status(404).json(
                    transform({
                        params: {
                            err: 'NOT_FOUND',
                            errmsg: 'User not found',
                        },
                    }),
                );
            }
            const { password, ...rest } = result;
            response.status(200).json(transform({ id: request.body.id, result: rest }));
        } catch (error) {
            next(error);
        }
    },
};
