export default {
    name: 'userStatusConfigure',
    schemas: {
        verify: {
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'User status configure API JSON',
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    enum: ['api.user.status'],
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
                        id: {
                            type: 'string',
                        },
                        user_name: {
                            type: 'string',
                        },
                        status: {
                            type: 'string',
                        },
                    },
                    required: ['id', 'user_name', 'status'],
                    additionalProperties: false,
                },
            },
            required: ['id', 'ver', 'ts', 'params', 'request'],
            additionalProperties: false,
        },
    },
};
