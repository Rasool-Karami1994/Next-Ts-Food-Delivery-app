export interface Category {
  id: string;
  title: string;
  image: string;
}

export type DiscountState = {
  showInput: boolean;
  code: string;
  applied: boolean;
  error: string;
};
export interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity?: number;
}
export interface CartItemsProps {
  cartItem: Product;
}
export interface DeliveryFormValues {
  customerName: string;
  province: string;
  city: string;
  fullAddress: string;
  postalCode: string;
  mobile: string;
}
export type DeliveryMethod = "delivery" | "bySelf";

export type makedTimeType = {
  time: string;
  day: string;
};
export type RadioOption = {
  id: string;
  value: string;
  label: string;
};

export interface DiscountState {
  showInput: boolean;
  code: string;
  applied: boolean;
  error: string;
}
