import * as yup from 'yup';

export interface FormValues {
  email: string;
  password: string;
}

export const authSchema = yup
  .object({
    email: yup
      .string()
      .email('Некорректный email')
      .required('Email обязателен'),

    password: yup
      .string()
      .min(6, 'Минимум 6 символов')
      .matches(/[A-Z]/, 'Пароль должен содержать заглавную букву')
      .required('Пароль обязателен'),
  })
  .required();

// export type FormValues = yup.InferType<typeof authSchema>;
