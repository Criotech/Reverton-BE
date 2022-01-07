const pick = <T extends Record<string, any>>(
  body: T,
  keys: string[]
): Partial<T> => Object.entries(body).reduce(
    (acc, [key, value]) => (keys.includes(key) ? { ...acc, [key]: value } : acc),
    {}
  );

export default pick;
