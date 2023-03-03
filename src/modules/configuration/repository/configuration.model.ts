import { model, Schema } from 'mongoose';
import { ConfigurationThreshold } from 'src/entity';

const ConfigurationThresholdSchema = new Schema<ConfigurationThreshold>(
  {
    name: {
      type: Number,
      default: 0,
    },
    nameBn: {
      type: Number,
      default: 0,
    },
    fatherBn: {
      type: Number,
      default: 0,
    },
    motherBn: {
      type: Number,
      default: 0,
    },
    dob: {
      type: Number,
      default: 0,
    },
    nid: {
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
