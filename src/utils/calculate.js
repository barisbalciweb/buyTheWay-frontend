export const calculate = (state) => {
  const cartItemsCount = state.cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );
  const total = state.cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return { cartItemsCount, total };
};
