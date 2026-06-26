export interface productsresponse {
  results: number;
  metadata: Metadata;
  data: product[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface product {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
  reviews: Review[];
}
 export interface Review {
  _id: string;
  review: string;
  rating: number;
  product: string;
  createdAt: string;
  updatedAt: string;
  user: {
    _id: string;
    name: string;
  };
}
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}


export interface CartData {
  status: string
  message: string
  numOfCartItems: number
  cartId: string
  data: CartResponseData
}

export interface CartResponseData {
  _id: string
  cartOwner: string
  products: CartProducts[]
  createdAt: string
  updatedAt: string
  __v: number
  totalCartPrice: number
}

export interface CartProducts {
  count: number
  _id: string
  product: string
  price: number
}
