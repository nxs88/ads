import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { authSchema, FormValues } from '../model/validation';
import { useLogin, useRegister } from '@shared/queries/authQuery';
import { store } from '@app/store';
import { setAuth } from '@entities/auth';

export const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const activeMutation = isRegister ? registerMutation : loginMutation;

  const resolver: Resolver<FormValues> = yupResolver(
    authSchema
  ) as Resolver<FormValues>;

  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver,
  });

  const onSubmit = (data: FormValues) => {
    activeMutation.mutate(data, {
      onSuccess: (res) => {
        store.dispatch(
          setAuth({ user: res.user, accessToken: res.accessToken })
        );
      },
      onError: (err: unknown) => {
        console.log('Server error', err);
      },
    });
  };

  return (
    <form
      className="max-w-sm mx-auto mt-20 space-y-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text -2x1 font-bold">
        {isRegister ? 'Регистрация' : 'Вход'}
      </h1>
      <div className="space-y-1">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full"
          {...register('email')}
        />
        {formState.errors.email && (
          <p className="text-red-500 text-sm">
            {formState.errors.email.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <input
          type="password"
          placeholder="Пароль"
          className="border p-2 w-full"
          {...register('password')}
        />
        {formState.errors.password && (
          <p className="text-red-500 text-sm">
            {formState.errors.password.message}
          </p>
        )}
      </div>
      {activeMutation.error && (
        <p className="text-red-500 text-sm">
          {activeMutation.error.response?.data?.message ?? 'Произошла ошибка'}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending
          ? 'Загрузка...'
          : isRegister
          ? 'Зарегистрироваться'
          : 'Войти'}
      </button>

      <button
        type="button"
        className="text-sm text-blue-600"
        onClick={() => setIsRegister(!isRegister)}
      >
        {isRegister ? 'У меня уже есть аккаунт' : 'Создать аккаунт'}
      </button>
    </form>
  );
};
