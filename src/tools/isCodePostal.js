export function isCodePostal(codePostal) {
  const regexCodePostal = /^[0-9]{5}$/;
  return codePostal  && regexCodePostal.test(codePostal);
}
