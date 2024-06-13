import Inputrror from "../../error/InputError";
import sendMail from "../../mail";
import createToken from "../../utils/createToken";
import Auth from "./controller";

const CheckUser = async (request, h) => {
  let payload = {};
  try {
    const { email, password } = request.payload;
    payload = { email, password };
  } catch (error) {
    1;
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
      token: createToken(newUser),
      message: "Register berhasil",
      data: newUser,
    });
  } catch (error) {
    return h
      .response({
        message: "Register failed",
        error: "Email / Username already exists",
      })
      .code(400);
  }
};

const ForgetPassword = async (request, h) => {
  const { email } = request.payload ?? {
    email: null,
  };

  if (!email) {
    return h
      .response({
        message: "Email is required",
      })
      .code(400);
  }

  const kode = Math.floor(100000 + Math.random() * 900000);

  sendMail({ to: email, kode });

  return h.response({
    message: "Code has been sent to your email",
    kode,
  });
};

const ChangePassword = async (request, h) => {
  const { email, password } = request.payload ?? {
    email: null,
    password: null,
  };

  if (!email || !password) {
    return h
      .response({
        message: "Email and password is required",
      })
      .code(400);
  }

  const res = await Auth.changePassword({ email, password });

  return h.response({
    message: "Password has been changed",
  });
};

export { CheckUser, RegisterUser, ForgetPassword, ChangePassword };
