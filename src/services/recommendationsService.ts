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

const handleVote = async (type: string, id: string) => {
  try {
    if (!Number(id)) throw new HttpException(400, `ID invalid [${id}]. It must contains only numbers.`);

    const score = await recommendationsRepository.getScoreById(id);

    if (type.includes("upvote")) {
      recommendationsRepository.updateScore(id, score + 1);
    } else {
      if (score - 1 < -5) {
        recommendationsRepository.removeRecommendation(id);
      } else {
        recommendationsRepository.updateScore(id, score - 1);
      }
    }
  } catch (err) {
    if (err.type === "NOT_FOUNDED") throw new HttpException(404, err.message);
    else throw err;
  }
}

export { insert, handleVote };