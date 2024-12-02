import mongoose, { Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    patientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IAppointment>("Appointment", AppointmentSchema);
