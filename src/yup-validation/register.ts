import { ObjectSchema, string, ref, object } from 'yup';

import { RegisterValues } from '@/types/auth';

const registerSchema: ObjectSchema<RegisterValues> = object({
  firstName: string().required('First Name is required'),
  lastName: string().required('Last Name is required'),
  email: string().email('Invalid E-mail').required('Email is required'),
  phoneNumber: string()
    .required('Phone number is required')
    .test({
      name: 'len',
      test: (val) => val.length === 9,
      message: 'invalid Phone number',
    }),
  idNumber: string()
    .required('Personal id is required')
    .test({
      name: 'len',
      test: (val) => val.length === 11,
      message: 'Invalid personal id',
    }),
  password: string().required('password is required'),
  confirmPassword: string()
    .required('confirm password field is required')
    .oneOf([ref('password')]),
});
export { registerSchema };
