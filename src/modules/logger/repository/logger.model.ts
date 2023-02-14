import { model, Schema } from 'mongoose';
import { LoggerResponse } from 'src/entity';

const LoggerSchema = new Schema<LoggerResponse>(
  {
    url: {
      type: String,
      index: true,
    },
    method: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      index: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    requestBody: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    response: {
      type: String,
      required: true,
    },
    isError: {
      type: Boolean,
      required: true,
    },
    level: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  },
);

const LoggerModel = model<LoggerResponse>('logger', LoggerSchema);
export { LoggerModel };
