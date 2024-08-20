import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import userService from '../services/oauthUsers';

export default {
    name: 'user:info',
    handler: () => async (request: Request, response: Response, next: NextFunction) => {
        try {
            const user = _.get(request, ['body', 'user']);
            const data = {
                user_name: user?.user_name,
                email_address: user?.email_address,
            };
            const result = await userService.find(data);
            response.json(result);
        } catch (error) {
            next(error);
        }
    },
};
