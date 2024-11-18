import Joi from "joi";

export const diagnosisSchema = Joi.object({
  patientId: Joi.string().required(),
  doctorId: Joi.string().required(),
  description: Joi.string().required(),
  medications: Joi.array().items(Joi.string()).optional(),
  exams: Joi.array().items(Joi.string()).optional(),
});
