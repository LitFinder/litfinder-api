import getConnection from "../../connection/database";
import hashPassword from "../../utils/hashPassword";

const Auth = {
  check: async ({ email, password }) => {
    const db = await getConnection();
    const sql =
      "SELECT id, email, username, name, bio, imageProfile FROM user WHERE email = ? AND password = ?";
    const [results] = await db.execute(sql, [
      email,
      await hashPassword(password),
    ]);

    db.end();
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

    db.end();
    return results;
  },

  findUser: async (id) => {
    const db = await getConnection();
    const sql =
      "SELECT id, email, username, name, bio, imageProfile FROM user WHERE id = ?";
    const [results] = await db.execute(sql, [id]);

    db.end();
    return results[0];
  },

  changePassword: async ({ email, password }) => {
    const db = await getConnection();

    const pw = await hashPassword(password);

    const sql = `UPDATE user SET password = '${pw}' WHERE email = '${email}'`;
    const [results] = await db.execute(sql);

    db.end();
    return results;
  },
};

export default Auth;
