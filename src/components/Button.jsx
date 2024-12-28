import {} from "react";
import { cn } from "../utils/cn";

const Button = ({ children, className, variant = "primary", ...restProps }) => {
  const baseStyles = `active:scale-95 flex items-center justify-center gap-2 w-10 h-10 font-semibold text-sm  focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100`;

  const variantStyles = {
    primary: `bg-blue-500 text-white hover:bg-blue-600 disabled:bg-primary `,
    secondary: `bg-green-500 text-white hover:bg-green-600  disabled:bg-gray-800 `,
    danger: `bg-red-500 text-white hover:bg-red-600 disabled:bg-red-500 `,
  };

  return (
    <button
      className={cn(baseStyles, variantStyles[variant], className)}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
