import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "O ID do usuário é obrigatório"],
    },
    medicalHistory: {
      type: [String],
      default: [],
    },
    medications: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Patient", PatientSchema);
