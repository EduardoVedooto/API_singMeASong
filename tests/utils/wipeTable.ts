import connection from "../../src/database"

const wipeTable = async () => await connection.query("TRUNCATE TABLE recommendations RESTART IDENTITY");

export default wipeTable;