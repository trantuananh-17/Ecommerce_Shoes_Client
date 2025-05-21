import Joi from "joi";

export const sizeSchema = Joi.string()
  .trim()
  .pattern(/^\d{1,2}$/)
  .max(5)
  .required()
  .messages({
    "string.base": "SIZE_NAME_STRING",
    "string.empty": "SIZE_NAME_EMPTY",
    "string.pattern.base": "SIZE_NAME_INVALID_FORMAT",
    "any.required": "SIZE_NAME_REQUIRED",
    "string.max": "SIZE_NAME_MAX_5_CHARACTERS",
  });
