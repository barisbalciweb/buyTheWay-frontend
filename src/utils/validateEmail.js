import validator from "validator";

export const validateEmail = (input) => {
  const isEmailValid = validator.isEmail(input);
  return isEmailValid;
};
