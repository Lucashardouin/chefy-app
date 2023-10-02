export function isRestaurantName(restaurantName) {
  return restaurantName && restaurantName.length >= 3 && restaurantName.length <= 15;
}