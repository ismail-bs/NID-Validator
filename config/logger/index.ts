const { LOGGER_INSERT_DB } = process.env;

export const loggerConfig = {
  insertDB: Boolean(LOGGER_INSERT_DB) || false,
};
