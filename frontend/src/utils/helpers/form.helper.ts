export const findFormError = (error: { [key: string]: string }) => {
  return Object.entries(error).find(
    ([key, value]) => key !== "server" && value.length > 0
  );
};
