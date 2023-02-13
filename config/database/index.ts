const { DB, MONGODB_URI } = process.env;

export const dbConfig = {
  mongodb: {
    URI: MONGODB_URI || 'mongodb://127.0.0.1:27017/nid-validator-dev',
  },
  db: DB || 'MONGO',
};
