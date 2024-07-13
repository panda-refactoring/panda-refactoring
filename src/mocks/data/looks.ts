import { productMin } from "./products-min";
import { profile } from "./profile";

export const looks = [
  {
    id: 1,
    createdDate: '2023-05-21',
    description: 'test1',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' }],
    imgurl: [{ id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDItMjAtMjAtMTctMTggMDAxLmpwZWc%3D.jpeg' },],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 1,
    user: {
      nickname: 'panda123',
      profileImg: profile.USER1,
    }
  },
  // {
  //   id: 2,
  //   createdDate: '2023-05-21',
  //   description: 'test2',
  //   hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' }],
  //   imgurl: [{ id: 0, img: '' },],
  //   product: productMin.filter(product => product.id === 15),
  //   fav: [{
  //     id: 0,
  //     productId: 1,
  //     userId: 1,
  //   }],
  //   userId: 4,
  //   user: {
  //     nickname: 'juicemoon',
  //     profileImg: profile.USER4,
  //   }
  // },
  {
    id: 3,
    createdDate: '2023-05-22',
    description: 'test3',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' },{ id: 2, tag: 'tag3' }],
    imgurl: [{ id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDItMjAtMjAtMTctMTkgMDAyLmpwZWc%3D.jpeg' },],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 1,
    user: {
      nickname: 'panda123',
      profileImg: profile.USER1,
    }
  },
  {
    id: 4,
    createdDate: '2023-05-22',
    description: 'test4',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' },{ id: 2, tag: 'tag3' }],
    imgurl: [{ id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDItMjAtMjAtMTctMTkgMDAzLmpwZWc%3D.jpeg' },],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 1,
    user: {
      nickname: 'panda123',
      profileImg: profile.USER1,
    }
  },
  {
    id: 5,
    createdDate: '2023-06-01',
    description: 'test5',
    hashTag: [{ id: 0, tag: 'tag1' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTAtMDMtNDYtMTcgMDAxLmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTAtMDMtNDYtMTcgMDAyLmpwZWc%3D.jpeg' }
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 2,
    user: {
      nickname: 'rlorxl',
      profileImg: profile.USER2,
    }
  },
  {
    id: 6,
    createdDate: '2023-06-03',
    description: 'test6',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag1' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDggMDAxLmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDkgMDAyLmpwZWc%3D.jpeg' }],
    product: productMin.filter(product => product.id === 15),
    fav: [{
      id: 0,
      productId: 1,
      userId: 2,
    },{
      id: 1,
      productId: 1,
      userId: 3,
    },
    ],
    userId: 3,
    user: {
      nickname: 'ee7y',
      profileImg: profile.USER3,
    }
  },
  {
    id: 7,
    createdDate: '2023-06-04',
    description: 'test7',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' },{ id: 2, tag: 'tag3' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDkgMDA1LmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDkgMDA2LmpwZWc%3D.jpeg' },
      { id: 2, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDkgMDA3LmpwZWc%3D.jpeg' }
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [{
      id: 0,
      productId: 1,
      userId: 2,
    },{
      id: 1,
      productId: 1,
      userId: 3,
    },
    {
      id: 2,
      productId: 1,
      userId: 1,
    },
    {
      id: 3,
      productId: 1,
      userId: 5,
    }],
    userId: 4,
    user: {
      nickname: 'juicemoon',
      profileImg: profile.USER4,
    }
  },
  {
    id: 8,
    createdDate: '2023-06-07',
    description: 'test8',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' },{ id: 2, tag: 'tag3' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDkgMDA4LmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDkgMDA5LmpwZWc%3D.jpeg' },
      { id: 2, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTgtNTQtMDkgMDEwLmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [{
      id: 0,
      productId: 1,
      userId: 2,
    },{
      id: 1,
      productId: 1,
      userId: 3,
    },
    {
      id: 2,
      productId: 1,
      userId: 1,
    }],
    userId: 4,
    user: {
      nickname: 'juicemoon',
      profileImg: profile.USER4,
    }
  },
  {
    id: 9,
    createdDate: '2023-06-08',
    description: 'test9',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' },{ id: 2, tag: 'tag3' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktMDEtNDQgMDAzLmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 4,
    user: {
      nickname: 'juicemoon',
      profileImg: profile.USER4,
    }
  },
  {
    id: 10,
    createdDate: '2023-06-08',
    description: 'test10',
    hashTag: [{ id: 0, tag: 'tag1' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktNTktMTEuanBlZw%3D%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktNTktNDEgMDAxLmpwZWc%3D.jpeg' },
      { id: 2, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktNTktNDEgMDAyLmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [{
      id: 0,
      productId: 1,
      userId: 2,
    },{
      id: 1,
      productId: 1,
      userId: 3,
    },
    {
      id: 2,
      productId: 1,
      userId: 1,
    },
    {
      id: 3,
      productId: 1,
      userId: 5,
    }],
    userId: 5,
    user: {
      nickname: 'rose_pale',
      profileImg: profile.USER5,
    }
  },
  {
    id: 11,
    createdDate: '2023-06-08',
    description: 'test11',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' },{ id: 2, tag: 'tag3' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktNTktNDEgMDA0LmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktNTktNDEgMDAzLmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [{
      id: 0,
      productId: 1,
      userId: 2,
    }],
    userId: 5,
    user: {
      nickname: 'rose_pale',
      profileImg: profile.USER5,
    }
  },
  {
    id: 12,
    createdDate: '2023-06-09',
    description: 'test12',
    hashTag: [{ id: 0, tag: 'tag1' },{ id: 1, tag: 'tag2' },{ id: 2, tag: 'tag3' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktNTktNDIgMDEwLmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTEtMTktNTktNDIgMDA5LmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 4,
    user: {
      nickname: 'juicemoon',
      profileImg: profile.USER4,
    }
  },
  {
    id: 13,
    createdDate: '2023-06-09',
    description: 'test13',
    hashTag: [{ id: 0, tag: 'tag1' }],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTMtMTgtMDAtMTUgMDAxLmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTMtMTgtMDAtMTUgMDAyLmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [{
      id: 0,
      productId: 1,
      userId: 2,
    },{
      id: 1,
      productId: 1,
      userId: 5,
    }],
    userId: 3,
    user: {
      nickname: 'ee7y',
      profileImg: profile.USER3,
    }
  },
  {
    id: 14,
    createdDate: '2023-06-10',
    description: 'test14',
    hashTag: [{ id: 0, tag: 'tag1' },{id: 1, tag: 'tag2'}],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDMtMTMtMTgtMDAtMTYgMDA1LmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 3,
    user: {
      nickname: 'ee7y',
      profileImg: profile.USER3,
    }
  },
  {
    id: 15,
    createdDate: '2023-06-10',
    description: 'test15',
    hashTag: [{ id: 0, tag: 'tag1' },{id: 1, tag: 'tag2'}],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDQtMDYtMDAtMzctMDMgMDAxLmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDQtMDYtMDAtMzctMDMgMDAyLmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 4,
    user: {
      nickname: 'juicemoon',
      profileImg: profile.USER4,
    }
  },
  {
    id: 16,
    createdDate: '2023-07-01',
    description: 'test16',
    hashTag: [{ id: 0, tag: 'tag1' },{id: 1, tag: 'tag2'}],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDQtMDYtMDAtMzctMDQgMDA1LmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDQtMDYtMDAtMzctMDQgMDA0LmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 4,
    user: {
      nickname: 'juicemoon',
      profileImg: profile.USER4,
    }
  },
  {
    id: 17,
    createdDate: '2023-07-03',
    description: 'test17',
    hashTag: [{ id: 0, tag: 'tag1' },{id: 1, tag: 'tag2'},{id: 2, tag: 'tag2'}],
    imgurl: [
      { id: 0, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDQtMDYtMDAtMzctMDQgMDA2LmpwZWc%3D.jpeg' },
      { id: 1, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDQtMDYtMDAtMzctMDQgMDA3LmpwZWc%3D.jpeg' },
      { id: 2, img: 'https://panda-products.s3.ap-northeast-2.amazonaws.com/lookbook/S2FrYW9UYWxrX1Bob3RvXzIwMjMtMDQtMDYtMDAtMzctMDUgMDA4LmpwZWc%3D.jpeg' },
    ],
    product: productMin.filter(product => product.id === 15),
    fav: [],
    userId: 4,
    user: {
      nickname: 'juicemoon',
      profileImg: profile.USER4,
    }
  },
]