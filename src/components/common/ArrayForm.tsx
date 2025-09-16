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
      <label className="text-sm">{name}</label>
      <div className="flex flex-col gap-y-4 items-center border rounded-lg p-4">
        {rows.map((row, i) => (
          <div key={i} className="w-full flex items-end gap-x-2">
            {children(row, (newObj: T) => editRowHandler(i, newObj))}
            <FaRegTrashAlt
              size={25}
              className="mb-2.5"
              onClick={() => removeRowHandler(i)}
            />
          </div>
        ))}

        <div className="w-1/3">
          <Button title="Add row" onClick={addRowHandler} />
        </div>
      </div>
    </div>
  );
};
