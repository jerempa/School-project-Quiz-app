import { executeQuery } from "../database/database.js";

const addUser = async (email, admin, password) => {
  await executeQuery(
    `INSERT INTO users
      (email, admin, password)
        VALUES ($email, $admin, $password)`,
    { email: email, admin: admin, password: password },
  );
}; //add a new user to the database

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT * FROM users WHERE email = $email",
    { email: email },
  );

  return result.rows; //find and return user based on email
};

export { addUser, findUserByEmail };
