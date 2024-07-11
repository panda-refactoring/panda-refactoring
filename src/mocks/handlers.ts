import { http, HttpResponse } from 'msw';

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost:3000/test', () => {
    return HttpResponse.json({
      successText: '성공입니다😀',
    });
  }),
];
