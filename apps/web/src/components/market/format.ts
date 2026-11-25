// Shared by the server-rendered board and the client-side charts
export function formatPrice(value: number, currency = "AED") {
  return `${currency} ${value.toFixed(value < 1 ? 3 : 2)}`;
}
