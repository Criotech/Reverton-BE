const randomString = (length: number) => Math.round(
  // eslint-disable-next-line no-restricted-properties
  Math.pow(36, length + 1) - Math.random() * Math.pow(36, length),
)
  .toString(36)
  .slice(1);

const randomDigit = () => Math.floor(1000 + Math.random() * 9000);

export {
  randomString,
  randomDigit
};
