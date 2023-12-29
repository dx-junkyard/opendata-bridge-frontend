import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  debug: process.env.NODE_ENV === 'development',
  session: { strategy: 'jwt' },
  providers: [
    CredentialsProvider({
      name: 'ログイン',
      credentials: {
        email: {
          label: 'email',
          type: 'text',
        },
        password: { label: 'パスワード', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('認証情報が正しくありません。再度お試しください。');
        }

        try {
          const response = await fetch(
            'https://' +
              (process.env.PROMPT_TEMPLATE_DOMAIN || 'localhost:3000') +
              '/api/auth/local',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                identifier: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(
              '一時的にログインに失敗しました。時間を置いて、再度お試しください。'
            );
          }

          const data = await response.json();

          return {
            id: data.user.id,
            name: data.user.username,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile }) => {
      if (user) {
        token.user = user;
      }
      if (account) {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session: ({ session }) => {
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
  },
};
