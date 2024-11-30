import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  uid: string;
  email: string;
  name: string;
  role: "medico" | "paciente";
  hospital?: string;
  createdAt?: Date;
  cpf: string;
  crm: string;
}

const UserSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    role: { type: String, enum: ["medico", "paciente"], required: true },
    hospital: { type: String },
    createdAt: { type: Date, default: Date.now },
    cpf: { type: String, unique: true },
    crm: { type: String, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
