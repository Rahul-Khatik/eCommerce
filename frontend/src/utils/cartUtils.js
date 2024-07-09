export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (accumulator, cartItem) => accumulator + cartItem.price * cartItem.qty,
      0
    )
  );

  // calculate shipping price (If order is over $100 then free, else $10 shipping)
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // calculate tax price (15%)
  state.taxPrice = addDecimals(Number(0.15 * state.itemsPrice));

  // calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );

  // Save to localStorage
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
