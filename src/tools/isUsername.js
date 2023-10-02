export function isUsername(username) {
  const usernameRegex = /^[^\s]+$/; // Pas d'espaces autorisés
  return username && username.length >= 3 && username.length <= 15 && usernameRegex.test(username);
}