import { looks } from "./looks";
import { productMin } from "./products-min";
import { profile } from "./profile";

export const loginInfos = [
  {
    id: 1,
    email: 'panda@test.com',
    password: '3lFxLu+iuHMiTVsAL1Xei0uhTeZgqxWsqKQoiQP8k7c40VwgFrD827KbP3X2xcXZ43ATPUrEKoGtrkBe0CvNvA==',
  }
]

export const users = [
  {
    createdDate: '2024-07-12',
    email: 'panda@test.com',
    id: 1,
    fav: [{
      id: 1,
      products: productMin.map(({id}) => id === 2 || id === 8 || id === 12 || id === 19 || id === 40 || id === 42),
      looks: looks.map(({id}) => id === 2 || id === 5 || id === 6 || id === 10 || id === 12 || id === 15),
    }],
    product: productMin.map(({id}) => id === 2 || id === 8 || id === 12 || id === 19 || id === 40 || id === 42),
    look: looks.filter(({userId}) => userId === 1 || userId === 3 || userId === 4),
    keywords: [{ id: 0, tag: '빈티지' }, { id: 1, tag: '캐주얼' }, { id: 2, tag: '시티보이' }],
    nickname: 'panda123',
    profileImg: profile.USER1,
    followers: [],
    followings: [],
  }
]