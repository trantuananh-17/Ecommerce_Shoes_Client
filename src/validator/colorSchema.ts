import Joi from "joi";

export const colorViSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "COLOR_VI_STRING",
    "string.empty": "COLOR_VI_EMPTY",
    "string.min": "COLOR_VI_MIN_2_CHARACTERS",
    "string.max": "COLOR_VI_MAX_50_CHARACTERS",
    "any.required": "COLOR_VI_REQUIRED",
  });

export const colorEnSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "COLOR_EN_STRING",
    "string.empty": "COLOR_EN_EMPTY",
    "string.min": "COLOR_EN_MIN_2_CHARACTERS",
    "string.max": "COLOR_EN_MAX_50_CHARACTERS",
    "any.required": "COLOR_EN_REQUIRED",
  });
