import { looks } from "./looks";
import { productMin } from "./products-min";
import { profile } from "./profile";

export const users = [
  {
    createdDate: '2024-07-12',
    email: 'panda123@test.com',
    id: 1,
    fav: [{
      id: 1,
      products: productMin.map(({id}) => id === 2 || id === 8 || id === 12 || id === 19 || id === 40 || id === 42),
      looks: looks.map(({id}) => id === 2 || id === 5 || id === 6 || id === 10 || id === 12 || id === 15),
    }],
    product: productMin.map(({id}) => id === 2 || id === 8 || id === 12 || id === 19 || id === 40 || id === 42),
    look: looks.filter(look => look.userId === 1),
    keywords: [{ id: 0, tag: '', }],
    nickname: 'pandauser1',
    profileImg: profile.USER1,
    followers: [],
    followings: [],
  }
]