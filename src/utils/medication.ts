export const convertAgeToMonth = (age: Age, isUpper: boolean = false): number =>
  age.year * 12 + (age.month ?? (isUpper ? 11 : 0));

export const getUsageByAge = (
  age: Age,
  usages: MedicationUsage[]
): MedicationUsage | null => {
  const cur = convertAgeToMonth(age);
  for (const usage of usages) {
    const lower = convertAgeToMonth(usage.ageRange.lower);
    const upper = convertAgeToMonth(usage.ageRange.upper, true);

    if (lower <= cur && cur <= upper) {
      return usage;
    }
  }

  return null;
};

export const calculateDose = (
  usage: MedicationUsage,
  weight: number,
  strengthMg?: number,
  volumeMl?: number
): DoseInfo => {
  const doseInfo: DoseInfo = { ...usage.doseInfo };

  // Check for kg
  if (doseInfo.doseUnit.includes("kg")) {
    doseInfo.doseLower = doseInfo.doseLower * weight;
    doseInfo.doseUpper = doseInfo.doseUpper * weight;
    doseInfo.doseUnit = doseInfo.doseUnit.filter((unit) => unit !== "kg");
  }

  // Check for g
  if (doseInfo.doseUnit.includes("g")) {
    doseInfo.doseLower = doseInfo.doseLower * 1000;
    doseInfo.doseUpper = doseInfo.doseUpper * 1000;
    doseInfo.doseUnit = doseInfo.doseUnit.map((unit) =>
      unit === "g" ? "mg" : unit
    );
  }

  // Check for mg
  if (doseInfo.doseUnit.includes("mg")) {
    doseInfo.doseLower = (doseInfo.doseLower * volumeMl!) / strengthMg!;
    doseInfo.doseUpper = (doseInfo.doseUpper * volumeMl!) / strengthMg!;
    doseInfo.doseUnit = doseInfo.doseUnit.map((unit) =>
      unit === "mg" ? "ml" : unit
    );
  }

  return doseInfo;
};

export const toNDecimalPlaces = (num: number, n: number = 2) => (Math.round(num * 100) / 100).toFixed(n)
