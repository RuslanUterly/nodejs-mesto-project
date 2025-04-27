import { Schema, model } from 'mongoose';
import validator from 'validator';

export type IUser = {
  name: string;
  about: string;
  avatar: string;
};

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 200,
    },
    avatar: {
      type: String,
      required: true,
      validate: {
        validator: (url: string) => validator.isURL(url),
        message: 'Ссылка для аватара некорректная',
      },
    },
  },
  {
    versionKey: false,
  },
);

export default model<IUser>('user', userSchema);
