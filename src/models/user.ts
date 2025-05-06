import mongoose, { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { UnauthorizedError } from '../errors/unauthorized';

export type IUser = {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
};

export type UserModel = mongoose.Model<IUser> & {
  findUserByCredentials: (username: string, password: string) =>
    Promise<mongoose.Document<unknown, any, IUser>>;
};

const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      validate: {
        validator: (url: string) => validator.isURL(url),
        message: 'Ссылка для аватара некорректная',
      },
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email: string) => validator.isEmail(email),
        message: 'Email некорректный',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(
          new UnauthorizedError('Почта или пароль введены неверно'),
        );
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new UnauthorizedError('Почта или пароль введены неверно'),
          );
        }
        return user;
      });
    });
};

export default model<IUser, UserModel>('user', userSchema);
