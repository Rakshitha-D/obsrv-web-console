import { table } from 'console';
import { find as query, create, destroy, update as alter} from '../../shared/databases/postgres';

export const getSave = (table: string) => ({
    save: (data: any) => create(table, data)
})

export const getFind = (table: string, errorMessage: string = "can't find the item") => {
    return ({
        find: async (conditionParams: any) => {
            const data = await query(table, conditionParams)
            if (data.length > 0) {
                return Promise.resolve(data[0])
            }
            return Promise.reject(errorMessage)
        }
    })
}

export const getRemove = (table: string) => ({
    remove: (data: any) => destroy(table, data)
})

export const getUpdate = (table: string, errorMessage = "can't find the item") => {
    return {
        update: async (conditionParams: any, updateParams: any) => {
            const data = await query(table, conditionParams);
            if (data.length === 0) {
                return Promise.reject(errorMessage);
            }
            const result = await alter(table, updateParams, conditionParams);
            return Promise.resolve(result.rows[0]);
        },
    };
};
