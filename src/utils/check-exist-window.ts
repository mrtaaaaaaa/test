export const checkExistWindow = () => {
  if (typeof window !== "undefined" ) {
    return true;
  }
  return null;
};
