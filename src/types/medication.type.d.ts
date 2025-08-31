declare type Age = {
  year: number;
  month?: number;
};

declare type AgeRange = {
  lower: Age;
  upper: Age;
};

declare type DoseInfo = {
  doseLower: number;
  doseUpper: number;
  doseUnit: string[];
};

declare type MedicationUsage = {
  indication: string;
  regimen: string;
  ageRange: AgeRange;
  doseInfo: DoseInfo;
  maxDoseAmount?: number;
  maxDoseUnit?: string[];
};

declare type Reference = {
  label: string;
  value?: string;
};

declare type Medication = {
  name: string;
  strengthMg?: number;
  volumeMl?: number;
  refs: Reference[];
  usages: MedicationUsage[];
};

declare type Result = {
  name: string;
  strengthMg?: number;
  volumeMl?: number;
  refs: Reference[];
  usage: MedicationUsage;
  calculatedDoseInfo: DoseInfo;
};
