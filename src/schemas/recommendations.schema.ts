import Joi from "joi";
import { IBody } from "../types/recommendationsTypes";

const recommendationsSchema = (data: IBody) => {
  return Joi.object({
    name: Joi.string().required(),
    genresIds: Joi.array().min(1).required().items(Joi.number()),
    youtubeLink: Joi.string().pattern(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/).required()
  }).validate(data);
}

export default recommendationsSchema;