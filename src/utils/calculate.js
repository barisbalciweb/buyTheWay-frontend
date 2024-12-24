import { calculateDiscountedPrice } from "./calculateDiscountedPrice";

export const calculate = (state) => {
  const cartItemsCount = state.cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const total = state.cartItems.reduce((sum, item) => {
    if (item.product.discountPercentage > 0) {
      return (
        sum +
        calculateDiscountedPrice(
          item.product.price,
          item.product.discountPercentage
        ) *
          item.quantity
      );
    } else {
      return sum + item.product.price * item.quantity;
    }
  }, 0);
  return { cartItemsCount, total };
};
