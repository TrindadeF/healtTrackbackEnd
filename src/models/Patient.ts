import mongoose, { Document, Schema } from "mongoose";

interface PatientDocument extends Document {
  nome: string;
  cpf: string;
  email: string;
  hospitalVinculado: string;
}

const PatientSchema: Schema = new Schema(
  {
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    hospitalVinculado: { type: String, required: true },
  },
  { timestamps: true }
);

const Patient = mongoose.model<PatientDocument>("Patient", PatientSchema);
export default Patient;
