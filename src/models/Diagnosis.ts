import mongoose, { Document, Schema } from "mongoose";

interface DiagnosisDocument extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  description: string;
  medications: string[];
  exams: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

const DiagnosisSchema: Schema = new Schema(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "O ID do paciente é obrigatório."],
    },
    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "O ID do médico é obrigatório."],
    },
    description: {
      type: String,
      required: [true, "A descrição é obrigatória."],
      trim: true,
    },
    medications: {
      type: [{ type: String }],
      default: [],
    },
    exams: {
      type: [{ type: String }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Diagnosis = mongoose.model<DiagnosisDocument>(
  "Diagnosis",
  DiagnosisSchema
);

export default Diagnosis;
