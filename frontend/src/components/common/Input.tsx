import { FormEvent } from "react";

type Props = {
  name: string;
  isInvalid?: boolean;
  type?: string;
  placeholder: string;
  onChange?: (e: FormEvent<HTMLInputElement>) => void;
  value?: string;
};

const Input = ({
  name,
  type = "text",
  isInvalid = false,
  placeholder,
  onChange,
  value,
}: Props) => {
  return (
    <input
      name={name}
      type={type}
      value={value}
      className="
							h-full w-full rounded-lg
							text-center text-lg text-warm-gray-500 focus:border-warm-gray-300"
      placeholder={placeholder}
      onChange={onChange}
      style={{
        border: isInvalid ? "1px solid #b91c1c" : "1px solid #d4d4d8",
      }}
    />
  );
};

export default Input;
