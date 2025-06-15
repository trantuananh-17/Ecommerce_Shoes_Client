export interface IProductItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountedPrice: number;
  isDiscounted: boolean;
  discountPercentage: number;
  averageRating: number;
  sizesWithQuantity: number;
  thumbnail: string;
}

export interface Image {
  _id: string;
  key: string;
  url: string;
}

export interface Size {
  sizeId: string;
  sizeName: string;
  quantity: number;
}

export interface Material {
  name: string;
  description: string;
}

export interface Brand {
  name: string;
  country: string;
  websiteUrl: string;
}

export interface IProductDetail {
  id: string;
  name: string;
  slug: string;
  brand: Brand;
  category: string;
  description: string;
  color: string;
  closure: string;
  material: Material;
  price: number;
  discountedPrice: number;
  isDiscounted: boolean;
  discountPercentage: number;
  averageRating: number;
  sizes: Size[];
  sizesWithQuantity: number;
  images: Image[];
  isInWishlist: boolean;
}
