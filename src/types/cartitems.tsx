export interface gatcartUser {
  status: string;
  numOfCartItems: number;
  cartId: string;
  data: cartUser;
}

export interface cartUser {
  _id: string;
  cartOwner: string;
  products: Cartitem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface Cartitem {
  count: number;
  _id: string;
  product: Productitem;
  price: number;
}

export interface Productitem {
  subcategory: Subcategory[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  id: string;

  slug?: string;
  description?: string;
  price?: number;
  ratingsQuantity?: number;
  images?: string[];
  sold?: number;
  createdAt?: string;
  updatedAt?: string;
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
