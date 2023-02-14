export enum LoggerLevel {
  NID_VERIFY = 'NID_VERIFY',
}

export class LoggerResponse {
  url: string;
  method: string;
  userAgent: string;
  ip: string;
  email: string;
  requestBody: string;
  statusCode: number;
  response: string;
  isError: boolean;
  level?: LoggerLevel;
}
