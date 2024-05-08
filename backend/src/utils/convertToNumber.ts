export function convertToNumber(numberString: string) {
  const numberFloat = parseFloat(
    numberString.replace(/\./g, "").replace(",", ".")
  );
  const numberInt = parseInt(numberFloat.toFixed(0));

  return numberInt;
}
