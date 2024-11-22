import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "O ID do usuário é obrigatório"],
    },
    crm: {
      type: String,
      required: [true, "O CRM é obrigatório"],
      unique: true,
    },
    specialty: {
      type: String,
      required: [true, "A especialidade é obrigatória"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Doctor", DoctorSchema);
