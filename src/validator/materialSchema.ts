import Joi from "joi";

export const materialViSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "MATERIAL_VI_STRING",
    "string.empty": "MATERIAL_VI_EMPTY",
    "string.min": "MATERIAL_VI_MIN_2_CHARACTERS",
    "string.max": "MATERIAL_VI_MAX_100_CHARACTERS",
    "any.required": "MATERIAL_VI_REQUIRED",
  });

export const materialEnSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "MATERIAL_EN_STRING",
    "string.empty": "MATERIAL_EN_EMPTY",
    "string.min": "MATERIAL_EN_MIN_2_CHARACTERS",
    "string.max": "MATERIAL_EN_MAX_100_CHARACTERS",
    "any.required": "MATERIAL_EN_REQUIRED",
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
