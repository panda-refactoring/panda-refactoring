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
  http.post<any, { nickname: string }, any>("/api/user/nickname", async ({ request }) => {
    const url = new URL(request.url);

    const userId = url.searchParams.get("id");

    const { nickname: enteredNickname } = await request.json();

    const existedNickname = users.find(user => user.nickname === enteredNickname);

    const isExistedNickname = !userId && existedNickname;
    const isAvailableNickname = !userId && !existedNickname;
    const userIdError = isAvailableNickname && enteredNickname;
    const enteredNameError = userId && !enteredNickname;
    const isUpdateAvailable = userId && enteredNickname;

    if (isAvailableNickname || isUpdateAvailable) return HttpResponse.json({ status: "ok" });
    if (isExistedNickname) return new HttpResponse("이미 존재하는 닉네임입니다.", { status: 401 });
    if (enteredNameError) return new HttpResponse("닉네임을 다시 입력해주세요.", { status: 404 });
    if (userIdError) return new HttpResponse("유저 아이디를 찾을 수 없습니다.", { status: 404 });
  }),
  http.post<any, { tags: string[] }, any>("/api/user/tag", async ({ request }) => {
    const url = new URL(request.url);

    const userId = url.searchParams.get("update");

    const targetUser = users.find(user => user.id === Number(userId));

    if (!targetUser) {
      return new HttpResponse("유저 아이디를 찾을 수 없습니다.", { status: 404 });
    }

    const { tags } = await request.json();

    const newKeywords = tags.map((tag, index) => ({ id: index, tag }));

    targetUser.keywords = newKeywords;

    return HttpResponse.json("유저정보 업데이트가 완료됨.", { status: 200 });
  }),
  http.post("/api/user/:id", async ({ request }) => {
    const url = new URL(request.url);

    const splitUrl = url?.pathname?.split("/");

    const userId = splitUrl?.at(-1);

    if (!userId) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({ message: "유저정보 업데이트가 완료됨." });
  }),
  http.post<any, { lookbookId: string }, any>("/api/look/post", async ({ request }) => {
    const url = new URL(request?.url);

    const pageParam = url.searchParams.get("pageParam");

    const { lookbookId } = await request.json();

    const TAKE_COUNT = 3;
    const cursorQuery = (pageParam as string) === "1" ? undefined : pageParam;
    const cursorId = cursorQuery ? parseInt(pageParam as string) : 1;

    const filterPosts = looks.filter(({ id }) => +lookbookId !== id);

    const cursor = cursorId - 1;

    const posts = filterPosts.slice(cursor, cursor + TAKE_COUNT);

    const nextId = posts.length < TAKE_COUNT ? undefined : posts[TAKE_COUNT - 1].id;

    return HttpResponse.json({ posts, nextId });
  }),
  http.post("/api/products", async ({ request }) => {
    const payload = await request.json();

    if (!payload) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(payload);
  }),
  http.post("/api/look", async ({ request }) => {
    const payload = await request.json();

    if (!payload) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(payload);
  }),
];
