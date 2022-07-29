export default () => ({
  app: {
    environment: process.env.ENV,
  },
  database: {
    mongodb: {
      host: process.env.DATABASE_URL,
    },
  },
  services: {
    openai: {
      orgId: process.env.OPEN_AI_ORG_ID,
      secretKey: process.env.OPEN_AI_SECRET_KEY,
    },
  },
  filesystem: {
    default: 's3',
    disks: {
        s3: {
            driver: 's3',
            bucket: process.env.AWS_S3_BUCKET,
            key: process.env.AWS_STANDARD_KEY_ID,
            secret: process.env.AWS_STANDARD_KEY_SECRET,
            region: process.env.AWS_DEFAULT_REGION,
        }
    }
  },
  queue: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    },
    sqs: {},
  },
});
