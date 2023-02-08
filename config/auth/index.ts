const { JWT_SECRET_KEY, JWT_EXPIRATION_TIME, JWT_SALT } = process.env;

export const authConfig = {
  salt: parseInt(JWT_SALT) || 10,
  expiration_time: JWT_EXPIRATION_TIME || '7d',
  jwt_key: JWT_SECRET_KEY || '@NID@SO',
};
