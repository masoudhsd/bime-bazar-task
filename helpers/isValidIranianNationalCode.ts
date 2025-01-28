export default function isValidIranianNationalCode(input: string) {
  // Check if the input is a 10-digit string
  if (!/^\d{10}$/.test(input)) {
    return false;
  }

  // Convert the input string into an array of digits
  const digits = input.split("").map(Number);

  // Check if all digits are the same (invalid case)
  if (digits.every((digit) => digit === digits[0])) {
    return false;
  }

  // Calculate the checksum
  const check = digits[9]; // The last digit is the control digit
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }

  const remainder = sum % 11;

  // Validate the control digit
  if (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  ) {
    return true;
  }

  return false;
}
