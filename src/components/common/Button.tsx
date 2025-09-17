import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isToggle?: boolean;
}

export const Button = ({ isToggle, ...props }: ButtonProps) => {
  const additionalClassName = () => {
    if (props.disabled) {
      return "bg-gray-100";
    } else if (isToggle) {
      return "bg-teal-300";
    }
    return "bg-teal-100 hover:bg-teal-200 cursor-pointer";
  };

  return (
    <button
      onClick={props.onClick}
      className={`w-full py-4 rounded-xl transition-all shadow-md ${additionalClassName()}`}
      {...props}
    >
      <p
        className={`w-full text-center text-lg ${
          isToggle ? "font-bold" : "font-semibold"
        }`}
      >
        {props.title}
      </p>
    </button>
  );
};
