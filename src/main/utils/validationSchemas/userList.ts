export default {
    name: 'userList',
    schemas: {
        verify: {
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'User List API JSON',
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    enum: ['api.user.list'],
                },
                ver: {
                    type: 'string',
                },
                ts: {
                    type: 'string',
                },
                params: {
                    type: 'object',
                    properties: {
                        msgid: {
                            type: 'string',
                        },
                    },
                    required: ['msgid'],
                    additionalProperties: false,
                },
                request: {
                    type: 'object',
                    properties: {
                        first_name: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 50,
                        },
                        last_name: {
                            type: 'string',
                            minLength: 3,
                            maxLength: 50,
                        },
                        provider: {
                            type: 'string',
                        },
                        mobile_number: {
                            type: 'object',
                            properties: {
                                country_code: {
                                    type: 'string',
                                    enum: ['+91'],
                                },
                                number: {
                                    type: 'string',
                                },
                            },
                            required: ['country_code', 'number'],
                            additionalProperties: false,
                        },
                        roles: {
                            type: 'string',
                            enum: ['admin', 'dataset_manager', 'viewer', 'dataset_creator'],
                        },
                        status: {
                            type: 'string',
                        },
                    },
                    additionalProperties: false,
                },
            },
            required: ['id', 'ver', 'ts', 'params', 'request'],
            additionalProperties: false,
        },
    },
};
