import { model, Schema } from 'mongoose';
import { ConfigurationThreshold } from 'src/entity';

const ConfigurationThresholdSchema = new Schema<ConfigurationThreshold>(
  {
    nameBn: {
      type: Number,
      default: 0,
    },
    nameEn: {
      type: Number,
      default: 0,
    },
    photo: {
      type: Number,
      default: 0,
    },
    signature: {
      type: Number,
      default: 0,
    },
    fathersNameBn: {
      type: Number,
      default: 0,
    },
    mothersNameBn: {
      type: Number,
      default: 0,
    },
    dateOfBirth: {
      type: Number,
      default: 0,
    },
    nidNumber: {
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
