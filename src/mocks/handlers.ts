import { http, HttpResponse } from "msw";
import { products } from "./data/products";
import { looks } from "./data/looks";
import { users } from "./data/users";

export const handlers = [
  http.get("/test", () => HttpResponse.json({ successText: "성공입니다😀" })),
  http.get(`/api/user`, ({ request }) => {
    const url = new URL(request.url);

    const enteredEmail = url.searchParams.get("email"); // panda@test.com

    if (!enteredEmail) {
      return new HttpResponse(null, { status: 404 });
    }

    const userData = users.find(({ email }) => email === enteredEmail);

    return HttpResponse.json({ user: userData });
  }),
  http.get("/api/products", () => HttpResponse.json(products)),
  http.get("/api/products/:id", ({ request }) => {
    const url = new URL(request.url);

    const splitUrl = url?.pathname?.split("/");

    const productId = splitUrl?.at(-1);

    if (!productId) {
      return new HttpResponse(null, { status: 404 });
    }

    const result = products.find(({ id }) => id === Number(productId));

    return HttpResponse.json(result);
  }),
  http.get("/api/look", () => HttpResponse.json(looks)),
  http.get("/api/look/:id", ({ request }) => {
    const url = new URL(request.url);

    const splitUrl = url?.pathname?.split("/");

    const lookId = splitUrl?.at(-1);

    if (!lookId) {
      return new HttpResponse(null, { status: 404 });
    }

    const result = looks.find(({ id }) => id === Number(lookId));

    return HttpResponse.json(result);
  }),
  http.post("/api/user/:id", ({ request }) => {
    const url = new URL(request.url);

    const splitUrl = url?.pathname?.split("/");

    const userId = splitUrl?.at(-1);

    if (!userId) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ message: "유저정보 업데이트가 완료됨." });
  }),
  http.post<any, { lookbookId: string }, any>(
    "/api/look/post",
    async ({ request }) => {
      const url = new URL(request?.url);

      const pageParam = url.searchParams.get("pageParam");

      const { lookbookId } = await request.json();

      const take = 3;
      const cursorQuery = (pageParam as string) === "1" ? undefined : pageParam;
      const cursorId = cursorQuery ? parseInt(pageParam as string) : 1;

      const filterPosts = looks.filter(({ id }) => +lookbookId !== id);

      const cursor = cursorId - 1;

      const posts = filterPosts.slice(cursor, cursor + take);

      const nextId = posts.length < take ? undefined : posts[take - 1].id;

      return HttpResponse.json({ posts, nextId });
    },
  ),
];
