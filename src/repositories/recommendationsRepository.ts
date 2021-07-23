import connection from "../database";

const insert = async (name: string, youtubeLink: string) => {
  try {
    await connection.query(`
      INSERT INTO recommendations 
      (name, "youtubeLink", score)
      VALUES ($1, $2, $3)
    `, [name, youtubeLink, 0]);
  } catch (err) {
    throw err;
  }
}

export { insert };
