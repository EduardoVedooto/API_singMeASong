import Joi from "joi";
import { IGenre } from "../types/genresTypes";


const genresSchema = (data: IGenre) => {
  return Joi.object({ name: Joi.string().required() }).validate(data);
}

export default genresSchema;