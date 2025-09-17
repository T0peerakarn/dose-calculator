"use server";

import mongoose from "mongoose";
import { MedicationModel } from "@/models/medication";

const connectMongoose = async () => {
  if (mongoose.connection.readyState === 1) return;

  await mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING!);
};

export const getAllMedications = async () => {
  await connectMongoose();

  const docs = await MedicationModel.find({}).lean();
  return JSON.parse(JSON.stringify(docs));
};

export const getMedicationById = async (id: string) => {
  await connectMongoose();

  const doc = await MedicationModel.findById(id).lean();
  return JSON.parse(JSON.stringify(doc));
};

export const createMedication = async (medication: Medication) => {
  await connectMongoose();

  const doc = new MedicationModel(medication);
  await doc.save();
};

export const updateMedication = async (
  id: string,
  newMedication: Medication
) => {
  await connectMongoose();

  await MedicationModel.findByIdAndUpdate(id, newMedication, {
    runValidators: true,
  });
};

export const deleteMedication = async (id: string) => {
  await connectMongoose();

  await MedicationModel.findByIdAndDelete(id);
};
