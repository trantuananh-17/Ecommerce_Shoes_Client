import Joi from "joi";

export const closureViSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "CLOSURE_VI_STRING",
    "string.empty": "CLOSURE_VI_EMPTY",
    "string.min": "CLOSURE_VI_MIN_2_CHARACTERS",
    "string.max": "CLOSURE_VI_MAX_100_CHARACTERS",
    "any.required": "CLOSURE_VI_REQUIRED",
  });

export const closureEnSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "CLOSURE_EN_STRING",
    "string.empty": "CLOSURE_EN_EMPTY",
    "string.min": "CLOSURE_EN_MIN_2_CHARACTERS",
    "string.max": "CLOSURE_EN_MAX_100_CHARACTERS",
    "any.required": "CLOSURE_EN_REQUIRED",
  });

export const descriptionViSchema = Joi.string()
  .trim()
  .min(5)
  .max(300)
  .required()
  .messages({
    "string.base": "DESCRIPTION_VI_STRING",
    "string.empty": "DESCRIPTION_VI_EMPTY",
    "string.min": "DESCRIPTION_VI_MIN_5_CHARACTERS",
    "string.max": "DESCRIPTION_VI_MAX_300_CHARACTERS",
    "any.required": "DESCRIPTION_VI_REQUIRED",
  });

export const descriptionEnSchema = Joi.string()
  .trim()
  .min(5)
  .max(300)
  .required()
  .messages({
    "string.base": "DESCRIPTION_EN_STRING",
    "string.empty": "DESCRIPTION_EN_EMPTY",
    "string.min": "DESCRIPTION_EN_MIN_5_CHARACTERS",
    "string.max": "DESCRIPTION_EN_MAX_300_CHARACTERS",
    "any.required": "DESCRIPTION_EN_REQUIRED",
  });
