import Joi from "joi";

export const createLiveSessionSchema = Joi.object({
  title: Joi.string().required(),
  speaker: Joi.string().required(),
  description: Joi.string().allow(""),

  date: Joi.date().required(),

  duration: Joi.number().required(),

  maxSeats: Joi.number().required(),

  meetingLink: Joi.string().allow(""),

  image: Joi.string().allow(""),
});