import { http, HttpResponse } from 'msw';

export const profileHandlers = [
  http.get('/api/profile', ({ request }) => {
    const auth = request.headers.get('authorization');

    if (!auth) {
      return new HttpResponse(null, { status: 401 });
    }

    return HttpResponse.json({
      id: 'user-1',
      email: 'test@test.com',
      name: 'Test user',
    });
  }),
];
