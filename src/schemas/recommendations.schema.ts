import Joi from "joi";

const recommendationsSchema = (data: object) => {
  return Joi.object({
    name: Joi.string().required(),
    youtubeLink: Joi.string().pattern(/^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/).required()
  }).validate(data);
}

export default recommendationsSchema;