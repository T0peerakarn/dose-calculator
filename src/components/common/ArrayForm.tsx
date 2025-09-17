import { Dispatch, SetStateAction } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "./Button";

interface ArrayFormProps<T> {
  name: string;
  rows: T[];
  addRowHandler: () => void;
  editRowHandler: (idx: number, newObj: T) => void;
  removeRowHandler: (idx: number) => void;
  children: (value: T, onChange: (newObj: T) => void) => React.ReactNode;
}

export const addRowHandler = <T,>(
  defaultObj: T,
  setArray: Dispatch<SetStateAction<T[]>>
) => {
  setArray((prev) => [...prev, { ...defaultObj }]);
};

export const editRowHandler = <T,>(
  idx: number,
  newObj: T,
  setArray: Dispatch<SetStateAction<T[]>>
) => {
  setArray((prev) =>
    prev.map((x, i) => (i === idx ? { ...newObj } : { ...x }))
  );
};

export const removeRowHandler = <T,>(
  idx: number,
  setArray: Dispatch<SetStateAction<T[]>>
) => {
  setArray((prev) => prev.filter((_, i) => i !== idx));
};

export const ArrayForm = <T,>({
  name,
  rows,
  addRowHandler,
  editRowHandler,
  removeRowHandler,
  children,
}: ArrayFormProps<T>) => {
  return (
    <div className="flex flex-col">
      <label className="text-xs">{name}</label>
      <div className="flex flex-col gap-y-4 items-center border rounded-lg p-4">
        {rows.map((row, i) => (
          <div key={i} className="w-full flex items-center gap-x-2">
            {children(row, (newObj: T) => editRowHandler(i, newObj))}

            <div className="border p-2 rounded-lg bg-red-200 cursor-pointer transition-all hover:bg-red-300">
              <FaRegTrashAlt size={25} onClick={() => removeRowHandler(i)} />
            </div>
          </div>
        ))}

        <div className="w-1/4">
          <Button title="Add row" onClick={addRowHandler} />
        </div>
      </div>
    </div>
  );
};
