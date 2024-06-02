const validate = async (decoded) => {
  if (decoded.id != 1) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

export default validate;
