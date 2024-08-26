export default {
    name: 'userRolesConfigure',
    schemas: {
        verify: {
            $schema: 'http://json-schema.org/draft-07/schema#',
            title: 'User roles configure API JSON',
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    enum: ['api.user.roles'],
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
                        roles: {
                            type: 'array',
                            items: {
                                type: 'string',
                                enum: ['admin', 'dataset_manager', 'viewer', 'dataset_creator'],
                            },
                            minItems: 1,
                            uniqueItems: true,
                        },
                    },
                    required: ['id', 'user_name', 'roles'],
                    additionalProperties: false,
                },
            },
            required: ['id', 'ver', 'ts', 'params', 'request'],
            additionalProperties: false,
        },
    },
};
