import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import userService from '../services/oauthUsers';
import { transform } from '../../shared/utils/transformResponse';

export default {
    name: 'user:info',
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
            response.status(200).json(transform({ id: request.body.id, result: { id: result.id, email_address: result.email_address } }));
        } catch (error) {
            next(error);
        }
    },
};
