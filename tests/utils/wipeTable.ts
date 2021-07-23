import connection from "../../src/database"

const wipeTable = async (table: string) => {
  await connection.query(`TRUNCATE TABLE ${table} RESTART IDENTITY`)
};

export default wipeTable;