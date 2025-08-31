interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
}

export function Input<T>({ name, ...props }: InputProps<T>) {
  return (
    <div className="w-full flex flex-col">
      <label className="text-xs">{name}</label>
      <input
        className={`border-2 rounded-lg p-2 ${
          props.disabled ? "bg-gray-300" : ""
        } transition-all`}
        {...props}
      />
    </div>
  );
}
