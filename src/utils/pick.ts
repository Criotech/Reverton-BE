const pick = <T extends Record<string, any>> (obj: T, keys: string[]):Partial<T> => {
  const picked: Partial<T> = {};

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    if (keys.includes(key)) {
      picked[key] = obj[key];
    }
  }

  return picked;
};

export default pick;
