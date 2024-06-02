import Auth from "../services/auth/controller";

const validate = async (decoded) => {
  const user = await Auth.findUser(decoded.id);

  if (!user) {
    return { isValid: false };
  } else {
    return { isValid: true };
  }
};

export default validate;
