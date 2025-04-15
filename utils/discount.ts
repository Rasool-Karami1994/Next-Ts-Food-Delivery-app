import { DiscountState } from "@/types";

export const DEFAULT_DISCOUNT_STATE: DiscountState = {
  showInput: false,
  code: "",
  applied: false,
  error: "",
};

export const DISCOUNT_AMOUNT = 50000;

export function validateDiscountCode(code: string): {
  isValid: boolean;
  errorMessage?: string;
} {
  const discountRegex = /^discount$/i;
  if (discountRegex.test(code)) {
    return { isValid: true };
  }
  return { isValid: false, errorMessage: "کد تخفیف وارد شده صحیح نیست!" };
}

export function calculateDiscountAmount(discount: DiscountState): number {
  return discount.applied ? DISCOUNT_AMOUNT : 0;
}
