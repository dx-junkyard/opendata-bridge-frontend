import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type LoginForm = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: '',
    password: '',
  });

  const setEmail = (email: string) => {
    setLoginForm((prev) => ({ ...prev, email }));
  };

  const setPassword = (password: string) => {
    setLoginForm((prev) => ({ ...prev, password }));
  };

  const login = async () => {
    try {
      await signIn('credentials', {
        redirect: true,
        ...loginForm,
      });
    } catch (error) {
      console.error('error', error);
    }
  };

  return {
    loginForm,
    setEmail,
    setPassword,
    login,
  };
};
