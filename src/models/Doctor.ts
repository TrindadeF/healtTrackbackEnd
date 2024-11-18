import mongoose, { Document, Schema } from "mongoose";

interface DoctorDocument extends Document {
  nome: string;
  cpf: string;
  crm: string;
  hospitalVinculado: string;
  email: string;
}

const DoctorSchema: Schema = new Schema(
  {
    nome: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    crm: { type: String, required: true },
    hospitalVinculado: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model<DoctorDocument>("Doctor", DoctorSchema);
export default Doctor;
