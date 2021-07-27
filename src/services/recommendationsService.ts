import HttpException from "../exceptions/HttpException";
import * as recommendationsRepository from "../repositories/recommendationsRepository";
import recommendationsSchema from "../schemas/recommendations.schema";
import { IBody, IRecommendation } from "../types/recommendationsTypes";

export const insert = async (body: IBody) => {
  const validation = recommendationsSchema(body);
  if (validation.error) throw new HttpException(400, validation.error.details[0].message);

  try {
    const { name, youtubeLink, genresIds } = body;
    const recommendationId = await recommendationsRepository.insert(name, youtubeLink);
    genresIds.forEach(async genreId => {
      try {
        await recommendationsRepository.insertGenre(genreId, recommendationId)
      } catch (err) {
        throw err;
      }
    });
  } catch (err) {
    throw err;
  }
}

export const handleVote = async (type: string, id: string) => {
  try {
    if (!Number(id)) throw new HttpException(400, `ID invalid [${id}]. It must contains only numbers.`);

    const score = await recommendationsRepository.getScoreById(id);

    if (score === undefined) throw new HttpException(404, `Recommendation not founded. ID (${id}) invalid.`);

    if (type.includes("upvote")) {
      await recommendationsRepository.updateScore(id, score + 1);
    } else {
      if (score - 1 < -5) {
        await recommendationsRepository.removeRecommendation(id);
      } else {
        await recommendationsRepository.updateScore(id, score - 1);
      }
    }
  } catch (err) {
    throw err;
  }
}

export const generateRandom = async () => {
  const random = Math.trunc(Math.random() * 10); // Get a number between 1 to 10

  const rowCount = await recommendationsRepository.rowCount();
  if (rowCount === 0) throw new HttpException(404, "Recommendations list is empty");

  let result: IRecommendation;

  try {
    // 30%
    if (random <= 3) {
      result = await recommendationsRepository.lowerOrEqualThan10();
      if (!result) return recommendationsRepository.greaterThan10();
      else return result;
    }

    // 70%
    else {
      result = await recommendationsRepository.greaterThan10();
      if (!result) return recommendationsRepository.lowerOrEqualThan10();
      else return result;
    }
  } catch (err) {
    throw err;
  }
}

export const topRank = async (offset: string) => {
  try {
    if (!Number(offset) || Number(offset) < 1)
      throw new HttpException(400, `Amount invalid (${offset}). It must be a positive integer.`);

    const result = await recommendationsRepository.getTopRank(Number(offset));
    if (!result.length) throw new HttpException(404, `Recommendations list is empty`);
    return result;
  } catch (err) { throw err }
}