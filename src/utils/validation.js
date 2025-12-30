export const objectRegEx = {
  name: /^[a-zA-Z]+$/,
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
  username: /^[a-zA-Z0-9]+[_,@]*[a-zA-Z0_9]*$/,
};
export const validateField = (type, value) => {
  if (!objectRegEx[type]) return true;
  return objectRegEx[type].test(value);
};
