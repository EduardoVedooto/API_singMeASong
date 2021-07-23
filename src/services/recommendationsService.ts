import HttpException from "../exceptions/HttpException";
import * as recommendationsRepository from "../repositories/recommendationsRepository";
import recommendationsSchema from "../schemas/recommendations.schema";
import { IBody } from "../types/recommendationsTypes";

const insert = async (body: IBody) => {
  const validation = recommendationsSchema(body);
  if (validation.error) throw new HttpException(400, validation.error.details[0].message);

  try {
    const { name, youtubeLink } = body;
    await recommendationsRepository.insert(name, youtubeLink);
  } catch (err) {
    throw err;
  }
}

export { insert };