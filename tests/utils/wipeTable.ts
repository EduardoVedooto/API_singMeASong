import connection from "../../src/database"

const wipeTable = async (table: string) => {
  await connection.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`);
};

export default wipeTable;