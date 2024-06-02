import jwt from "jsonwebtoken";

const createToken = (user) =>
  jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_KEY,
    {
      algorithm: "HS256",
    }
  );

export default createToken;
