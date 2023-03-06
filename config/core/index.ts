const {
  PORT,
  API,
  ENV,
  HOST,
  REST_API_PREFIX,
  BASE_URL,
  ML_MODEL_SERVER_BASE_URL,
} = process.env;

export const coreConfig = {
  port: parseInt(PORT) || 3001,
  api: API || 'REST',
  env: ENV || 'DEVELOPMENT',
  host: HOST || 'localhost',
  restApiPrefix: REST_API_PREFIX || 'api',
  baseUrl: BASE_URL || 'http://127.0.0.1:3001',
  mlServerBaseURL: ML_MODEL_SERVER_BASE_URL || 'http://127.0.0.1:5000',
};
