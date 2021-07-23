import connection from "../database";
import DBException from "../exceptions/DBException";

export const create = async (name: string) => {
  try {
    await connection.query("INSERT INTO genres (name) VALUES ($1)", [name]);
  } catch (err) {
    throw new DBException(err.code, err.message);
  }
}

export const read = async () => {
  try {
    const result = await connection.query("SELECT * FROM genres ORDER BY name ASC");
    return result.rows;
  } catch (err) {
    throw err;
  }
}