import { useEffect, useState } from "react";

import { Button, Input, Select } from "@/components";
import { mockMedications } from "@/constants";
import { calculateDose, getUsageByAge } from "@/utils";
import React from "react";

export const Calculator = () => {
  const [medication, setMedication] = useState<string>("");
  const [indication, setIndication] = useState<string>("");
  const [age, setAge] = useState<Age>({ year: 0, month: 0 });
  const [weight, setWeight] = useState<number>(0);
  const [result, setResult] = useState<Result | null>(null);

  const isCalculateButtonDisable =
    medication === "" ||
    indication === "" ||
    (age.year === 0 && age.month === 0) ||
    weight === 0;

  const getMedicationChoices = () =>
    mockMedications.map((m) => ({ value: m.name, label: m.name }));

  const getIndicationChoices = () =>
    medication
      ? [
          ...new Set(
            mockMedications
              .find((m) => m.name == medication)!
              .usages.map((u) => u.indication)
          ),
        ].map((i) => ({ value: i, label: i }))
      : [];

  const handleDoseCalculate = () => {
    const medObj: Medication = mockMedications.find(
      (m) => m.name === medication
    )!;
    const usageObjs: MedicationUsage[] = medObj.usages.filter(
      (u) => u.indication === indication
    );
    const usage: MedicationUsage | null = getUsageByAge(age, usageObjs);

    if (!usage) {
      window.alert("ไม่มีขนาดยาที่เหมาะกับช่วงอายุที่กำหนด");
      return;
    }

    const doseInfo: DoseInfo = calculateDose(
      usage,
      weight,
      medObj.strengthMg,
      medObj.volumeMl
    );

    setResult({ ...medObj, usage, calculatedDoseInfo: doseInfo });
  };

  const renderForm = () => (
    <>
      <Select
        name="Medication"
        options={getMedicationChoices()}
        value={medication}
        setValue={(newMed: string) => setMedication((prev) => newMed)}
      />

      <Select
        name="Indication"
        options={getIndicationChoices()}
        value={indication}
        setValue={(newInd: string) => setIndication((prev) => newInd)}
        disabled={!medication}
      />

      <div className="w-full flex gap-x-2">
        <Input
          name="Age (year)"
          type="number"
          value={age.year.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAge({ ...age, year: Math.max(+e.target.value, 0) })
          }
        />

        <Input
          name="Age (month)"
          type="number"
          value={age.month!.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setAge({ ...age, month: ((+e.target.value % 12) + 12) % 12 })
          }
        />

        <Input
          name="Weight (kg)"
          type="number"
          value={weight.toString()}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWeight((prev) => Math.max(+e.target.value, 0))
          }
        />
      </div>

      <div className="w-full flex justify-center my-4">
        <div className="w-1/3 h-fit">
          <Button
            title="คำนวณยา"
            onClick={handleDoseCalculate}
            disabled={isCalculateButtonDisable}
          />
        </div>
      </div>
    </>
  );

  const renderResult = () => {
    if (!result) {
      return;
    }

    let calculatedMaxDoseAmount = result.usage.maxDoseAmount ?? 0;
    let calculatedMaxDoseUnit = result.usage.maxDoseUnit ?? [];

    // Check for kg
    if (calculatedMaxDoseUnit.includes("kg")) {
      calculatedMaxDoseAmount = calculatedMaxDoseAmount * weight;
      calculatedMaxDoseUnit = calculatedMaxDoseUnit.filter(
        (unit) => unit !== "kg"
      );
    }

    // Check for g
    if (calculatedMaxDoseUnit.includes("g")) {
      calculatedMaxDoseAmount = calculatedMaxDoseAmount * 1000;
      calculatedMaxDoseUnit = calculatedMaxDoseUnit.map((unit) =>
        unit === "g" ? "mg" : unit
      );
    }

    // Check for mg
    if (calculatedMaxDoseUnit.includes("mg")) {
      calculatedMaxDoseAmount =
        (calculatedMaxDoseAmount * result.volumeMl!) / result.strengthMg!;
      calculatedMaxDoseUnit = calculatedMaxDoseUnit.map((unit) =>
        unit === "mg" ? "ml" : unit
      );
    }
    return (
      <>
        <div className="border-2 rounded-lg px-4 py-2 flex flex-col gap-y-4">
          <h1 className="text-lg font-semibold">Dosage</h1>
          <div className="grid grid-cols-8 gap-y-4">
            <strong>Name:</strong>
            <p className="col-span-7 font-semibold">{result.name}</p>

            <strong>Medication info:</strong>
            <p className="col-span-7">
              {[
                result.strengthMg && `ความแรง ${result.strengthMg} mg`,
                result.volumeMl && `${result.volumeMl} ml`,
                result.usage.regimen,
              ]
                .filter((x) => x)
                .join(", ")}
            </p>

            <strong>Dose info:</strong>
            <p className="col-span-7">
              {result.usage.doseInfo.doseLower} -{" "}
              {result.usage.doseInfo.doseUpper}{" "}
              {result.usage.doseInfo.doseUnit.join("/")}
            </p>
            <p className="col-start-2 col-span-7 font-semibold">
              {result.calculatedDoseInfo.doseLower} -{" "}
              {result.calculatedDoseInfo.doseUpper}{" "}
              {result.calculatedDoseInfo.doseUnit.join("/")}
              {calculatedMaxDoseAmount &&
                calculatedMaxDoseAmount <
                  result.calculatedDoseInfo.doseUpper && (
                  <label className="ml-2 text-red-500 text-sm">
                    (เกินขนาด max dose)
                  </label>
                )}
            </p>

            {calculatedMaxDoseUnit.length > 0 && (
              <>
                <strong>Max dose:</strong>
                <p className="col-span-7">
                  {result.usage.maxDoseAmount}{" "}
                  {result.usage.maxDoseUnit!.join("/")}
                </p>
                <p className="col-start-2 col-span-7 font-semibold">
                  {calculatedMaxDoseAmount} {calculatedMaxDoseUnit.join("/")}
                </p>
              </>
            )}

            <strong>References:</strong>
            <div className="col-span-7 flex">
              {result.refs.map((ref, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <p>,&nbsp;</p>}
                  {ref.value ? (
                    <a
                      href={ref.value}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-all cursor-hover"
                    >
                      {ref.label}
                    </a>
                  ) : (
                    <p>{ref.label}</p>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    setIndication("");
    setResult(null);
  }, [medication]);

  return (
    <>
      {renderForm()}
      <hr />
      {renderResult()}
    </>
  );
};
