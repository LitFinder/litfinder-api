
import crypto from "crypto";

const hashPassword = async (password) => {
  const hash = crypto.createHash("md5").update(password).digest("hex");
  return hash;
};

export default hashPassword;
