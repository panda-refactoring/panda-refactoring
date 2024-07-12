import { http, HttpResponse } from 'msw';
import { products } from './data/products';

export const handlers = [
  http.get('/test', () => HttpResponse.json({ successText: '성공입니다😀'})),
  http.get('/api/products', () => HttpResponse.json(products)),
  http.get(`/api/products/:id`, ({request}) => {
    const url = new URL(request.url);

    const splitUrl = url?.pathname?.split('/');

    const productId = splitUrl?.at(-1);

    if (!productId) {
      return new HttpResponse(null, {status: 404});
    }
    
    const result = products.find(({id}) => id === Number(productId));
    
    return HttpResponse.json(result)
  })
];
