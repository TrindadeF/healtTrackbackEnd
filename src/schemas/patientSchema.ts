import Joi from "joi";

export const patientSchema = Joi.object({
  nome: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  email: Joi.string().email().required(),
  hospitalVinculado: Joi.string().required(),
});
