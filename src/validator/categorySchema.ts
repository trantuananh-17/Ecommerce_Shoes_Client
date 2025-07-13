import Joi from "joi";

export const categoryViSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "CATEGORY_VI_STRING",
    "string.empty": "CATEGORY_VI_EMPTY",
    "string.min": "CATEGORY_VI_MIN_2_CHARACTERS",
    "string.max": "CATEGORY_VI_MAX_100_CHARACTERS",
    "any.required": "CATEGORY_VI_REQUIRED",
  });

// Schema kiểm tra tên danh mục Tiếng Anh
export const categoryEnSchema = Joi.string()
  .trim()
  .min(2)
  .max(100)
  .required()
  .messages({
    "string.base": "CATEGORY_EN_STRING",
    "string.empty": "CATEGORY_EN_EMPTY",
    "string.min": "CATEGORY_EN_MIN_2_CHARACTERS",
    "string.max": "CATEGORY_EN_MAX_100_CHARACTERS",
    "any.required": "CATEGORY_EN_REQUIRED",
  });
