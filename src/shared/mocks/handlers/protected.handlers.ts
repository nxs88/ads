import { HttpResponse } from 'msw';
import { http } from 'msw';

export const protectedHandlers = [
  http.post('/api/protected', ({ request }) => {
    const csrfToken = request.headers.get('x-csrf-token');
    const cookie = request.headers.get('cookie') ?? '';

    const csrfCookie = cookie
      .split('; ')
      .find((c) => c.startsWith('csrfToken='))
      ?.split('=')[1];

    if (!csrfCookie || csrfToken !== csrfCookie) {
      return new HttpResponse(null, { status: 403 });
    }

    return HttpResponse.json({ ok: true });
  }),
];
