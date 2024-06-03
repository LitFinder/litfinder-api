import Inputrror from "../../error/InputError";
import createToken from "../../utils/createToken";
import Auth from "./controller";

const CheckUser = async (request, h) => {
  let payload = {};
  try {
    const { email, password } = request.payload;
    payload = { email, password };
  } catch (error) {1
    throw new Inputrror();
  }

  const { email, password } = payload;

  const user = await Auth.check({ email, password });

  if (!user) {
    return h
      .response({
        message: "Email or Password is wrong",
      })
      .code(401);
  }

  return h.response({
    message: "Login success",
    token: createToken(user),
    data: user,
  });
};

const RegisterUser = async (request, h) => {
  let payload = {};
  try {
    const { name, username, email, password } = request.payload;
    payload = { name, username, email, password };
  } catch (error) {
    throw new Inputrror();
  }

  const { name, username, email, password } = payload;

  try {
    const user = await Auth.register({ name, username, email, password });

    const newUser = await Auth.findUser(user.insertId);

    return h.response({
      status: "success",
      message: "Register berhasil",
      data: newUser,
    });
  } catch (error) {
    return h.response({
      message: "Register failed",
      error: "Email / Username already exists",
    });
  }
};

export { CheckUser, RegisterUser };
