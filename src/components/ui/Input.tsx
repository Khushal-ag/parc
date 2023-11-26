function Input({
  className,
  type,
  placeholder,
}: {
  className: string;
  type: string;
  placeholder: string;
}) {
  return <input className={className} type={type} placeholder={placeholder} />;
}

export default Input;
