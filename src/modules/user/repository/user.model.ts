import { model, Schema } from 'mongoose';
import { User, Role } from 'src/entity';

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Role,
      default: Role.ADMIN,
      required: true,
      uppercase: true,
    },
    resetPasswordToken: {
      type: String,
      index: true,
    },
    resetPasswordExpires: Number,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const UserModel = model<User>('user', UserSchema);
export { UserModel };
