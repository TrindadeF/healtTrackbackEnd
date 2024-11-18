import Joi from "joi";

export const doctorSchema = Joi.object({
  nome: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  crm: Joi.string().required(),
  hospitalVinculado: Joi.string().required(),
  email: Joi.string().email().required(),
});
