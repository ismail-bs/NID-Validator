const { SEND_GRID_API_KEY } = process.env;

export const sendGridConfig = {
  apiKey: SEND_GRID_API_KEY || '',
};
