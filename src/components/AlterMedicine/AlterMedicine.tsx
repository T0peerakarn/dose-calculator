import { Dispatch, SetStateAction, useState } from "react";
import { ArrayForm, Input } from "../common";

export const AlterMedicine = () => {
  const defaultReference: Reference = {
    label: "",
    value: "",
  };

  const [references, setReferences] = useState<Reference[]>([]);

  const addRowHandler = <T,>(
    defaultObj: T,
    setArray: Dispatch<SetStateAction<T[]>>
  ) => {
    setArray((prev) => [...prev, { ...defaultObj }]);
  };

  const editRowHandler = <T,>(
    idx: number,
    newObj: T,
    setArray: Dispatch<SetStateAction<T[]>>
  ) => {
    setArray((prev) =>
      prev.map((x, i) => (i === idx ? { ...newObj } : { ...x }))
    );
  };

  const removeRowHandler = <T,>(
    idx: number,
    setArray: Dispatch<SetStateAction<T[]>>
  ) => {
    setArray((prev) => prev.filter((_, i) => i !== idx));
  };

  const ReferenceInput = (
    obj: Reference,
    onChange: (newObj: Reference) => void
  ) => (
    <div className="w-full flex gap-x-2">
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

  const renderForm = () => (
    <>
      <Input name="Name" />

      <div className="flex flex-col gap-y-2">
        <div className="w-full flex gap-x-2">
          <Input name="Strength (mg)" type="number" />
          <Input name="Volume (ml)" type="number" />
        </div>
        <span className="text-sm text-red-500">หากไม่มี กรุณากรอก 0</span>
      </div>

      <ArrayForm
        name="References"
        rows={references}
        addRowHandler={() => addRowHandler(defaultReference, setReferences)}
        editRowHandler={(idx: number, newObj: Reference) =>
          editRowHandler(idx, newObj, setReferences)
        }
        removeRowHandler={(idx: number) => removeRowHandler(idx, setReferences)}
      >
        {(obj, onChange) => ReferenceInput(obj, onChange)}
      </ArrayForm>
    </>
  );

  console.log(references);
  return <>{renderForm()}</>;
};
