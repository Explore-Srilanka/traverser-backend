export default () => ({
    app: {
        environment: process.env.ENV,
    },
    database: {
        mongodb: {
            host: process.env.DATABASE_URL,
        }
    },
    services: {
        openai: {
            orgId: process.env.OPEN_AI_ORG_ID,
            secretKey: process.env.OPEN_AI_SECRET_KEY
        }
    },
    queue: {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT
        },
        sqs: {

        }
    },

});