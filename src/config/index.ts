import * as joi from '@hapi/joi';
import * as dotenv from 'dotenv';

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

// validating environment variables
const schema = joi
  .object({
    PORT: joi.number().required(),
    NODE_ENV: joi
      .string()
      .valid('development', 'production', 'staging')
      .required(),
    LOG_LEVEL: joi
      .string()
      .valid('error', 'warning', 'info', 'debug', 'silly')
      .default('silly'),

    // User Service
    USER_SVC: joi.string().required(),
    INVENTORY_SVC: joi.string().required(),
    LOGISTICS_SVC: joi.string().required(),
    AUTHORIZATION_SVC: joi.string().required(),
    ORDER_SVC: joi.string().required(),
    AUCTION_SVC: joi.string().required(),
    WALLET_SVC: joi.string().required(),
    NOTIFICATION_SVC: joi.string().required(),
    LOAN_SVC: joi.string().required(),
    FACEBOOK_APP_ID: joi.string().required(),
    FACEBOOK_APP_SECRET: joi.string().required(),
    GOOGLE_APP_ID: joi.string().required(),
    GOOGLE_APP_SECRET: joi.string().required(),
    CRM_SVC: joi.string().required(),
    REDIS_URL: joi.string().required(),
    HEADLESS_CHROME_URL: joi.string().required(),
    // Google Cloud storage
    SERVICE_ACCOUNT_KEY_PATH: joi.string().required(),
    PRIVATE_BUCKET_NAME: joi.string().required(),
    PUBLIC_BUCKET_NAME: joi.string().required(),
    PUBLIT_API_KEY: joi.string().required(),
    PUBLIT_API_SECRET: joi.string().required(),
    PUBLIT_FOLDER: joi.string().required(),
  })
  .unknown()
  .required();

const { error, value: envVars } = schema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  isDevelopment:
    envVars.NODE_ENV === 'development' || envVars.NODE_ENV === 'staging'
      ? true
      : false,
  port: envVars.PORT,
  NODE_ENV: envVars.NODE_ENV,
  userSvc: envVars.USER_SVC,
  notificationSvc: envVars.NOTIFICATION_SVC,
  inventorySvc: envVars.INVENTORY_SVC,
  authorizationSvc: envVars.AUTHORIZATION_SVC,
  logisticsSvc: envVars.LOGISTICS_SVC,
  ordersSvc: envVars.ORDER_SVC,
  auctionSvc: envVars.AUCTION_SVC,
  walletSvc: envVars.WALLET_SVC,
  loanSvc: envVars.LOAN_SVC,
  facebookAppId: envVars.FACEBOOK_APP_ID,
  facebookAppSecret: envVars.FACEBOOK_APP_SECRET,
  googleAppId: envVars.GOOGLE_APP_ID,
  googleAppSecret: envVars.GOOGLE_APP_SECRET,
  crmSvc: envVars.CRM_SVC,
  headlessChromeUrl: envVars.HEADLESS_CHROME_URL,
  redisUrl: envVars.REDIS_URL,

  googleBucket: {
    serviceKeyPath: envVars.SERVICE_ACCOUNT_KEY_PATH,
    privateBucket: envVars.PRIVATE_BUCKET_NAME,
    publicBucket: envVars.PUBLIC_BUCKET_NAME,
  },
  publit: {
    apiKey: envVars.PUBLIT_API_KEY,
    secretKey: envVars.PUBLIT_API_SECRET,
    folder: envVars.PUBLIT_FOLDER,
  },
};
