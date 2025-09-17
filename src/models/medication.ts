"use server";

import mongoose from "mongoose";

const ageSchema = new mongoose.Schema<Age>(
  {
    year: { type: Number, required: true },
    month: Number,
  },
  { _id: false }
);

const ageRangeSchema = new mongoose.Schema<AgeRange>(
  {
    lower: { type: ageSchema, required: true },
    upper: { type: ageSchema, required: true },
  },
  { _id: false }
);

const doseInfoSchema = new mongoose.Schema<DoseInfo>(
  {
    doseLower: { type: Number, required: true },
    doseUpper: { type: Number, required: true },
    doseUnit: [{ type: String, required: true }],
  },
  { _id: false }
);

const medicationUsageSchema = new mongoose.Schema<MedicationUsage>(
  {
    indication: { type: String, required: true },
    regimen: { type: String, required: true },
    ageRange: { type: ageRangeSchema, required: true },
    doseInfo: { type: doseInfoSchema, required: true },
    maxDoseAmount: Number,
    maxDoseUnit: [{ type: String }],
  },
  { _id: false }
);

const referenceSchema = new mongoose.Schema<Reference>(
  {
    label: { type: String, required: true },
    value: String,
  },
  { _id: false }
);

const medicationSchema = new mongoose.Schema<Medication>({
  name: { type: String, required: true },
  strengthMg: Number,
  volumeMl: Number,
  refs: [referenceSchema],
  usages: [medicationUsageSchema],
});

export const MedicationModel =
  mongoose.models.Medication || mongoose.model("Medication", medicationSchema);
