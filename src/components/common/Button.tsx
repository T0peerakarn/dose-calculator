import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isToggle?: boolean;
}

export const Button = ({ isToggle, ...props }: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`w-full py-4 rounded-xl cursor-pointer transition-all shadow-md ${
        isToggle ? "bg-teal-300" : "bg-teal-100 hover:bg-teal-200"
      }`}
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
