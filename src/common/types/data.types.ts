export interface MainProductData {
  id: number;
  imgurl: {
    id: number;
    img: string;
  }[];
  category: string;
  createdDate: string;
  description: string;
  brand: string;
  lookId: number | null;
  price: number;
  title: string;
  style: string;
  rental: boolean;
  view?: number;
  favorite: {
    id: number;
    productId: number;
    userId: number;
  }[];
}

export interface ProductData {
  id: number;
  brand: string;
  category: string;
  description: string;
  price: number;
  title: string;
  view: number;
  style: string;
  rental: boolean;
  favorite: {
    id: number;
    productId: number;
    userId: number;
  }[];
  imgurl: {
    id: number;
    img: string;
    productId: number;
  }[];
  user: {
    id: number;
    nickname: string;
    profileImg?: string;
  };
  hashTag: {
    id: number;
    tag: string;
  }[];
}

export interface ProductDataMin {
  brand: string;
  id: string | number;
  price: number;
  title: string;
  rental: boolean;
  imgurl: { id: number; img: string }[];
}

export interface UserData {
  createdDate: string;
  email: string;
  id: number;
  favorite: {
    id: number;
    products: ProductDataMin[];
    looks: LookbookData[];
  }[];
  product: ProductData[] | ProductDataMin[];
  look: LookbookData[] | LookbookDataMin[];
  keywords: {
    id: number;
    tag: string;
  }[];
  nickname: string;
  profileImg?: string;
  followers: number[];
  followings: number[];
}

export interface LookbookData {
  id: number;
  createdDate: string;
  description: string;
  hashTag: { id: number; tag: string }[];
  imgurl: { id: number; img: string }[];
  product: ProductDataMin[];
  comment?: {
    id: number;
    text: string;
    author: { nickname: string };
  }[];
  favorite: {
    id: number;
    productId: number;
    userId: number;
  }[];
  userId: number;
  user: {
    nickname: string;
    profileImg: string;
  };
}

export interface LookbookDataMin {
  id: number;
  imgurl: { id: number; img: string }[];
  user: {
    nickname: string;
    profileImg: string;
  };
}
