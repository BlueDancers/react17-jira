export function cancelObj(object) {
  const result = { ...object };
  Object.keys(result).map((key) => {
    const value = result[key];
    if (value === undefined || value === "") {
      delete result[key];
    }
  });
  return result;
}
