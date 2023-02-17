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

export class DailyStatisticsPaginationQuery {
  date: Date;
}

export class DateWiseStatisticsPaginationQuery {
  startDate: Date;
  endDate: Date;
}

export class LoggerResponsesQueryExtendData {
  url?: string;
  email?: string;
}
