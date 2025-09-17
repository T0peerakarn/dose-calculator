import { useEffect, useState } from "react";
import {
  ArrayForm,
  Button,
  Input,
  addRowHandler,
  editRowHandler,
  removeRowHandler,
} from "@/components";
import {
  createMedication,
  getMedicationById,
  updateMedication,
} from "@/utils/mongoose";
import { PageProps } from "@/app/page";

export const AlterMedicine = ({ selectedId }: PageProps) => {
  const DEFAULT_REFERENCE: Reference = {
    label: "",
    value: "",
  } as const;
  const DEFAULT_USAGE: MedicationUsage = {
    indication: "",
    regimen: "",
    ageRange: {
      lower: {
        year: 0,
        month: 0,
      },
      upper: {
        year: 0,
        month: 0,
      },
    },
    doseInfo: {
      doseLower: 0,
      doseUpper: 0,
      doseUnit: [],
    },
    maxDoseAmount: 0,
    maxDoseUnit: [],
  } as const;

  const [name, setName] = useState<string>("");
  const [strengthMg, setStrengthMg] = useState<number | undefined>(undefined);
  const [volumeMl, setVolumeMl] = useState<number | undefined>(undefined);
  const [refs, setRefs] = useState<Reference[]>([]);
  const [usages, setUsages] = useState<MedicationUsage[]>([]);

  const submitHandler = async () => {
    const sanitizedMedication: Medication = {
      name,
      ...(strengthMg && { strengthMg }),
      ...(volumeMl && { volumeMl }),
      refs: refs.filter((r) => r.label),
      usages: usages.map((u) => ({
        ...u,
        ageRange: {
          ...u.ageRange,
          lower: {
            ...u.ageRange.lower,
            month: u.ageRange.lower.month || undefined,
          },
          upper: {
            ...u.ageRange.upper,
            month: u.ageRange.upper.month || undefined,
          },
        },
        maxDoseAmount: u.maxDoseAmount || undefined,
        maxDoseUnit: u.maxDoseUnit?.length ? u.maxDoseUnit : undefined,
      })),
    };

    try {
      if (selectedId) {
        await updateMedication(selectedId, sanitizedMedication);
        window.alert("แก้ไขยาสำเร็จ, กรุณา refresh");
      } else {
        await createMedication(sanitizedMedication);
        window.alert("เพิ่มยาใหม่สำเร็จ, กรุณา refresh");
      }
    } catch (e) {
      window.alert(e);
    }
  };

  const ReferenceInput = (
    obj: Reference,
    onChange: (newObj: Reference) => void
  ) => (
    <div className="w-full flex gap-2 border p-4 rounded-lg">
      <Input
        name="Label"
        value={obj.label}
        onChange={(e) => onChange({ ...obj, label: e.target.value })}
      />
      <Input
        name="Link"
        value={obj.value}
        onChange={(e) => onChange({ ...obj, value: e.target.value })}
      />
    </div>
  );

  const UsageInput = (
    obj: MedicationUsage,
    onChange: (newObj: MedicationUsage) => void
  ) => (
    <div className="w-full flex flex-col gap-2 border p-4 rounded-lg">
      <div className="w-full flex gap-2">
        <Input
          name="Indication"
          value={obj.indication}
          onChange={(e) => onChange({ ...obj, indication: e.target.value })}
        />

        <Input
          name="Regimen"
          value={obj.regimen}
          onChange={(e) => onChange({ ...obj, regimen: e.target.value })}
        />
      </div>

      <div className="w-full flex gap-2">
        <Input
          name="Age - lower bound (year)"
          type="number"
          value={obj.ageRange.lower.year.toString()}
          onChange={(e) =>
            onChange({
              ...obj,
              ageRange: {
                ...obj.ageRange,
                lower: {
                  ...obj.ageRange.lower,
                  year: Math.max(+e.target.value, 0),
                },
              },
            })
          }
        />

        <Input
          name="Age - lower bound (month)"
          type="number"
          value={(obj.ageRange.lower.month ?? 0).toString()}
          onChange={(e) =>
            onChange({
              ...obj,
              ageRange: {
                ...obj.ageRange,
                lower: {
                  ...obj.ageRange.lower,
                  month: ((+e.target.value % 12) + 12) % 12,
                },
              },
            })
          }
        />

        <Input
          name="Age - upper bound (year)"
          type="number"
          value={obj.ageRange.upper.year.toString()}
          onChange={(e) =>
            onChange({
              ...obj,
              ageRange: {
                ...obj.ageRange,
                upper: {
                  ...obj.ageRange.upper,
                  year: Math.max(+e.target.value, 0),
                },
              },
            })
          }
        />

        <Input
          name="Age - upper bound (month)"
          type="number"
          value={(obj.ageRange.upper.month ?? 0).toString()}
          onChange={(e) =>
            onChange({
              ...obj,
              ageRange: {
                ...obj.ageRange,
                upper: {
                  ...obj.ageRange.upper,
                  month: ((+e.target.value % 12) + 12) % 12,
                },
              },
            })
          }
        />
      </div>

      <div className="w-full flex gap-2">
        <Input
          name="Dose info - lower bound"
          value={obj.doseInfo.doseLower.toString()}
          type="number"
          onChange={(e) =>
            onChange({
              ...obj,
              doseInfo: {
                ...obj.doseInfo,
                doseLower: Math.max(+e.target.value, 0),
              },
            })
          }
        />

        <Input
          name="Dose info - upper bound"
          value={obj.doseInfo.doseUpper.toString()}
          type="number"
          onChange={(e) =>
            onChange({
              ...obj,
              doseInfo: {
                ...obj.doseInfo,
                doseUpper: Math.max(+e.target.value, 0),
              },
            })
          }
        />

        <Input
          name="Dose info - unit"
          value={obj.doseInfo.doseUnit.join("/")}
          onChange={(e) =>
            onChange({
              ...obj,
              doseInfo: {
                ...obj.doseInfo,
                doseUnit: e.target.value.split("/"),
              },
            })
          }
        />
      </div>

      <div className="w-full flex gap-2">
        <Input
          name="Max dose amount"
          value={(obj.maxDoseAmount ?? 0).toString()}
          type="number"
          onChange={(e) =>
            onChange({
              ...obj,
              maxDoseAmount: Math.max(+e.target.value, 0),
            })
          }
        />

        <Input
          name="Dose info - unit"
          value={(obj.maxDoseUnit ?? []).join("/")}
          onChange={(e) =>
            onChange({
              ...obj,
              maxDoseUnit: e.target.value.split("/"),
            })
          }
        />
      </div>
    </div>
  );

  const renderForm = () => (
    <>
      <Input
        name="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="w-full flex gap-x-2">
        <Input
          name="Strength (mg)"
          type="number"
          value={(strengthMg ?? 0).toString()}
          onChange={(e) => setStrengthMg(Math.max(+e.target.value, 0))}
        />
        <Input
          name="Volume (ml)"
          type="number"
          value={(volumeMl ?? 0).toString()}
          onChange={(e) => setVolumeMl(Math.max(+e.target.value, 0))}
        />
      </div>

      <ArrayForm
        name="References"
        rows={refs}
        addRowHandler={() => addRowHandler(DEFAULT_REFERENCE, setRefs)}
        editRowHandler={(idx: number, newObj: Reference) =>
          editRowHandler(idx, newObj, setRefs)
        }
        removeRowHandler={(idx: number) => removeRowHandler(idx, setRefs)}
      >
        {(obj, onChange) => ReferenceInput(obj, onChange)}
      </ArrayForm>

      <ArrayForm
        name="Usages details"
        rows={usages}
        addRowHandler={() => addRowHandler(DEFAULT_USAGE, setUsages)}
        editRowHandler={(idx: number, newObj: MedicationUsage) =>
          editRowHandler(idx, newObj, setUsages)
        }
        removeRowHandler={(idx: number) => removeRowHandler(idx, setUsages)}
      >
        {(obj, onChange) => UsageInput(obj, onChange)}
      </ArrayForm>

      <div className="w-full flex justify-center">
        <div className="w-1/3 h-20">
          <Button title="Submit" onClick={submitHandler} />
        </div>
      </div>
    </>
  );

  useEffect(() => {
    const fetchMedication = async () => {
      if (!selectedId) {
        return;
      }

      const response: Medication = await getMedicationById(selectedId);

      setName(response.name);
      setStrengthMg(response.strengthMg);
      setVolumeMl(response.volumeMl);
      setRefs(response.refs);
      setUsages(response.usages);
    };

    fetchMedication();
  }, [selectedId]);

  return <>{renderForm()}</>;
};
