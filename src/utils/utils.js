/* eslint-disable no-promise-executor-return */
export const isSameValues = (arr, obj) => {
  const res = arr.find((elem) => elem.id === obj.id);
  return typeof res !== 'object';
};

export const getNoun = (number, one, two, five) => {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return five;
  }
  n %= 10;
  if (n === 1) {
    return one;
  }
  if (n >= 2 && n <= 4) {
    return two;
  }
  return five;
};

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
