import connection from "../../src/database"
import { IGenre } from "../../src/types/genresTypes";
import faker from "faker";

export const genreBody: IGenre = {
  name: faker.lorem.sentence(Math.floor(Math.random() * (5 - 2) + 2))
}

export const createGenre = async (genreName?: string) => {
  try {
    await connection.query("INSERT INTO genres (name) VALUES ($1)", [genreName || genreBody.name]);
  } catch (err) {
    console.error(err);
    throw err;
  }
}