import { model, Schema } from 'mongoose';
import { ConfigurationThreshold } from 'src/entity';

const ConfigurationThresholdSchema = new Schema<ConfigurationThreshold>(
  {
    name_bangla: {
      type: Number,
      default: 0,
    },
    name_english: {
      type: Number,
      default: 0,
    },
    image: {
      type: Number,
      default: 0,
    },
    signature: {
      type: Number,
      default: 0,
    },
    fathers_name: {
      type: Number,
      default: 0,
    },
    mothers_name: {
      type: Number,
      default: 0,
    },
    DOB: {
      type: Number,
      default: 0,
    },
    NID_NO: {
      type: Number,
      default: 0,
    },
    address: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: {
      updatedAt: true,
      createdAt: false,
    },
    versionKey: false,
  },
);

const ConfigurationThresholdModel = model<ConfigurationThreshold>(
  'configuration-threshold',
  ConfigurationThresholdSchema,
);
export { ConfigurationThresholdModel };
