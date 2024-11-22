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
    patientId: { type: Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "Doctor", required: true },
    description: { type: String, required: true },
    medications: [{ type: String }],
    exams: [{ type: String }],
  },
  { timestamps: true }
);

const Diagnosis = mongoose.model<DiagnosisDocument>(
  "Diagnosis",
  DiagnosisSchema
);
export default Diagnosis;
