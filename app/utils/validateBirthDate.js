export const validateBirthDate = (day, month, year) => {
  const validDay = parseInt(day, 10);
  const validMonth = parseInt(month, 10);
  const validYear = parseInt(year, 10);
  const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let isValid = true;

  if (validMonth === 2) {
    const isLeapYear = (validYear % 4 === 0 && (validYear % 100 !== 0 || validYear % 400 === 0));
    monthLengths[1] = isLeapYear ? 29 : 28;
  }

  if (validDay > 0 && validDay <= monthLengths[validMonth - 1] && validMonth > 0 && validMonth <= 12 && validYear > 1900) {
    return new Date(validYear, validMonth - 1, validDay);
  }

  return null;
};
