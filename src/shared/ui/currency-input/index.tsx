import { TextInput } from "flowbite-react";
import { NumericFormat } from "react-number-format";

interface CurrencyInputProps {
  value: string | undefined;
  onChange: (name: string, value: number | undefined) => void;
  name?: string;
  id?: string;
  required?: boolean;
  label?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  value,
  onChange,
  name = "currency",
  id = "currency",
  required = false,
  label,
}) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <NumericFormat
        id={id}
        name={name}
        value={value}
        onValueChange={({ floatValue }) => {
          onChange(name, floatValue);
        }}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        decimalScale={2}
        fixedDecimalScale
        customInput={TextInput}
        required={required}
      />
    </div>
  );
};
