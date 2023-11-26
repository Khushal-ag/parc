type buttonType = "submit" | "reset" | "button";

function Button({
  className,
  type,
  children,
}: {
  className: string;
  type: buttonType;
  children: string;
}) {
  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}

export default Button;
