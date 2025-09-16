interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Input({ name, ...props }: InputProps) {
  return (
    <div className="w-full flex flex-col">
      <label className="text-xs">{name}</label>
      <input
        className={`border border-black rounded-lg p-2 ${
          props.disabled ? "bg-gray-200" : ""
        } transition-all`}
        {...props}
      />
    </div>
  );
}
