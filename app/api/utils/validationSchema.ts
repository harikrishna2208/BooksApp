import Joi from 'joi';
import { currentYear } from './date';

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(32).required().label('Password'),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const changePassword = Joi.object({
  userId: Joi.number().required(),
  currentPassword: Joi.string().min(8).max(32).required().label('Current Password'),
  newPassword: Joi.string().min(8).max(32).required().label('New Password'),
});

const paramsForGetBooks = Joi.object({
  limit: Joi.number().integer().positive().required(),
  offset: Joi.number().integer().positive().allow(0).required(),
  sortBy: Joi.string().valid('title', 'author', 'publicationYear').optional(),
  sortOrder: Joi.string().valid('asc', 'desc').optional(),
})

interface Book {
  id?: string | number;
  title: string;
  description: string;
  author: string;
  publicationYear: number;
}

const bookSchemaFunction = (requestBody: unknown, reqMethod: string): Joi.ValidationResult<Book | Book[]> => {
  const baseSchema = Joi.object<Book>({
    title: Joi.string().required().label('Book Name'),
    description: Joi.string().required().label('Description'),
    author: Joi.string().required().label('Author Name'),
    publicationYear: Joi.number().custom((value, helpers) => {
      console.log(typeof value)
      if (!Number.isInteger(value)) {
        return helpers.error('number.integer');
      }
      return value;
    }, 'custom integer validation').positive().max(currentYear()).min(1000).required().label('Publication Year'),

  });

  if (reqMethod === 'PUT') {
    const putSchema = baseSchema.keys({
      id: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
    });
    return Joi.array().items(putSchema).validate(requestBody, { abortEarly: false, allowUnknown: true });
  } else if (reqMethod === 'POST') {
    const postSchema = baseSchema.keys({
      id: Joi.forbidden(),
    });
    return postSchema.validate(requestBody, { abortEarly: false, allowUnknown: true });
  }

  return baseSchema.validate(requestBody, { abortEarly: false, allowUnknown: true });
};



export {
  signUpSchema,
  loginSchema,
  bookSchemaFunction,
  paramsForGetBooks,
  changePassword,
};
