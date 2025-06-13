export interface IProductItem {
  id: string;
  name: string;
  price: number;
  discountedPrice: number;
  isDiscounted: boolean;
  discountPercentage: number;
  averageRating: number;
  sizesWithQuantity: number;
  thumbnail: string;
}
