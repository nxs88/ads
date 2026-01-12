import { mockAuthServer } from '@shared/api/mockAuthServer';
import { HttpResponse } from 'msw';
import { http } from 'msw';

interface AuthRequestBody {
  email: string;
  password: string;
}

export const authHandler = [
  // LOGIN реальный бэкенд
  http.post('/api/login', async ({ request }) => {
    const { email, password } = (await request.json()) as AuthRequestBody;

    try {
      const result = mockAuthServer.login(email, password);

      return HttpResponse.json(
        {
          user: result.user,
          accessToken: result.accessToken,
        },
        {
          headers: {
            'Set-Cookie': [
              `refreshToken=${result.refreshToken}; HttpOnly; Path=/; SameSite=Lax`,
              `csrfToken=${result.csrfToken}; Path=/; SameSite=Lax`,
            ].join(', '),
          },
        }
      );
    } catch {
      return HttpResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  }),

  // REGISTER реальный бэкенд
  http.post('/api/register', async ({ request }) => {
    const { email, password } = (await request.json()) as AuthRequestBody;

    try {
      const result = mockAuthServer.register(email, password);

      return HttpResponse.json(
        {
          user: result.user,
          accessToken: result.accessToken,
        },
        {
          headers: {
            'Set-Cookie': [
              `refreshToken=${result.refreshToken}; HttpOnly; Path=/; SameSite=Lax`,
              `csrfToken=${result.csrfToken}; Path=/; SameSite=Lax`,
            ].join(', '),
          },
        }
      );
    } catch {
      return HttpResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }
  }),

  // REFRESH реальный бэкенд
  http.post('/api/refresh', ({ request }) => {
    const cookie = request.headers.get('cookie') ?? '';
    const refreshToken = cookie
      .split('; ')
      .find((c) => c.startsWith('refreshToken='))
      ?.split('=')[1];

    if (!refreshToken) {
      return new HttpResponse(null, { status: 401 });
    }

    try {
      const result = mockAuthServer.refresh(refreshToken);
      return HttpResponse.json(result);
    } catch {
      return new HttpResponse(null, { status: 401 });
    }
  }),
];
