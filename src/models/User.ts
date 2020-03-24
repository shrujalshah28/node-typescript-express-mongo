import { Document, Model, Schema, model, DocumentToObjectOptions } from 'mongoose';

import config from '../config/config';
import { Password } from '../services/password';

const passwordService = new Password(config);

export enum UserRole {
  'role1' = 'role1',
  'role2' = 'role2',
}

export interface IUser {
  email: string;
  password: string;
  role: UserRole;
}

export interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
  toJSON(options?: DocumentToObjectOptions): Omit<IUser, 'password'>;
}

export type IUserModel = Model<IUserDocument>;

const schema = new Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: Object.values(UserRole) },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc: IUserDocument, ret: IUser): Omit<IUser, 'password'> => {
        delete ret.password;
        return ret;
      },
    },
  },
);

schema.pre<IUserDocument>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const password = this.get('password');
  const hash = await passwordService.hashPassword(password);
  this.set('password', hash);
  next();
});

schema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return await passwordService.comparePassword(password, this.password);
};

const User: IUserModel = model<IUserDocument, IUserModel>('User', schema);

export default User;
