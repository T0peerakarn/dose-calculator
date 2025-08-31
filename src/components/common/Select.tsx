interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  setValue: (newValue: string) => void;
}

export const Select = ({
  name,
  options,
  value,
  setValue,
  ...props
}: SelectProps) => {
  return (
    <div className="w-full flex flex-col">
      <label className="text-xs">{name}</label>
      <select
        className={`border-2 rounded-lg p-2 ${
          props.disabled ? "bg-gray-300" : ""
        } transition-all`}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setValue(e.target.value)
        }
        {...props}
      >
        <option value={""} disabled>
          กรุณาเลือก {name}
        </option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};
