export interface IOrder {
  products: IOrderProduct[];
  coupon?: string;
  shippingAddress: string;
  paymentMethod: string;
}

export interface IOrderProduct {
  product: string;
  quantity: number;
  color: string;
}
