import { model, Schema } from 'mongoose';
import { MiddlewareResponse } from 'src/entity';

const MiddlewareResponseSchema = new Schema<MiddlewareResponse>(
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
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  },
);

const MiddlewareResponseModel = model<MiddlewareResponse>(
  'response',
  MiddlewareResponseSchema,
);
export { MiddlewareResponseModel };
