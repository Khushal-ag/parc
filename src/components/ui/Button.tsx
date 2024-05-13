import { MouseEventHandler } from "react";

function Button({
  type,
  children,
  onPress,
  disabled,
}: {
  type: "primary" | "danger";
  children: React.ReactNode;
  onPress: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) {
  let style = "bg-blue-700  hover:bg-blue-800  focus:ring-blue-300";
  if (type === "danger")
    style = "bg-red-700  hover:bg-red-800  focus:ring-red-300";

  return (
    <button
      className={`me-2 inline-flex items-center rounded-lg px-5 py-2.5 text-center text-base font-medium text-white focus:outline-none focus:ring-4 ${style}`}
      disabled={disabled}
      onClick={onPress}
    >
      {children}
    </button>
  );
}

export default Button;
