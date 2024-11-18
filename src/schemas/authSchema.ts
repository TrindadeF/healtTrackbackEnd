import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": 'O campo "email" deve conter um email válido.',
    "any.required": 'O campo "email" é obrigatório.',
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter no mínimo 6 caracteres.",
    "any.required": 'O campo "password" é obrigatório.',
  }),
  role: Joi.string().valid("doctor", "patient").required().messages({
    "any.only": 'O campo "role" deve ser "doctor" ou "patient".',
    "any.required": 'O campo "role" é obrigatório.',
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": 'O campo "email" deve conter um email válido.',
    "any.required": 'O campo "email" é obrigatório.',
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "A senha deve ter no mínimo 6 caracteres.",
    "any.required": 'O campo "password" é obrigatório.',
  }),
});
