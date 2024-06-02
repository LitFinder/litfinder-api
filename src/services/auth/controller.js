import getConnection from "../../connection/database";
import hashPassword from "../../utils/hashPassword";

const Auth = {
  check: async ({ email, password }) => {
    const db = await getConnection();
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    const [results] = await db.execute(sql, [
      email,
      await hashPassword(password),
    ]);
    return results[0];
  },

  register: async ({ name, username, email, password }) => {
    const db = await getConnection();
    const sql =
      "INSERT INTO user (email, password, name, username) VALUES (?, ?, ?, ?)";
    const [results] = await db.execute(sql, [
      email,
      await hashPassword(password),
      name,
      username,
    ]);
    return results;
  },

  findUser: async (id) => {
    const db = await getConnection();
    const sql = "SELECT * FROM user WHERE id = ?";
    const [results] = await db.execute(sql, [id]);
    return results[0];
  },
};

export default Auth;
