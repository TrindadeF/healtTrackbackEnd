import { match } from "assert";
import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  uid: string;
  email: string;
  name: string;
  role: "medico" | "paciente";
  hospital?: string;
  cpf?: string;
  createdAt?: Date;
  crm?: string;
}

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: [true, "O UID é obrigatório"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "O email é obrigatório"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Por favor, forneça um email válido"],
    },
    name: {
      type: String,
      required: [true, "O nome é obrigatório"],
      minlength: [3, "O nome deve ter pelo menos 3 caracteres"],
      maxlength: [50, "O nome deve ter no máximo 50 caracteres"],
    },
    role: {
      type: String,
      enum: {
        values: ["medico", "paciente"],
        message: "O papel deve ser 'medico' ou 'paciente'",
      },
      required: [true, "O papel é obrigatório"],
    },
    hospital: {
      type: String,
      required: function (this: IUser) {
        return this.role === "medico";
      },
    },
    cpf: {
      type: String,
      required: function (this: IUser) {
        return this.role === "paciente";
      },
      unique: true,
      match: [/^\d{11}$/, "O CPF deve conter exatamente 11 dígitos"],
    },
    crm: {
      type: String,
      required: function (this: IUser) {
        return this.role === "medico";
      },
      unique: true,
      match: [/^\d{6}$/, "O CPF deve conter exatamente 11 dígitos"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", UserSchema);
