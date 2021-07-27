import * as genresRepository from "../repositories/genresRepository";
import HttpException from "../exceptions/HttpException";
import genresSchema from "../schemas/genres.schema";
import { IGenre } from "../types/genresTypes";

export const create = async (body: IGenre) => {
  const validation = genresSchema(body);
  if (validation.error) throw new HttpException(400, "Genre name is invalid");

  try {
    await genresRepository.create(body.name);
  } catch (err) {
    if (err.code === '23505') throw new HttpException(409, "Category already exists");
    else throw err;
  }
}

export const read = async (): Promise<IGenre[]> => {
  try {
    return await genresRepository.read();
  } catch (err) {
    throw err;
  }
}