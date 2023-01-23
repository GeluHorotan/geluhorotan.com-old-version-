import type { ReactNode } from 'react';

type Props = {
  value: string;
  type: string;
  name: string;
  error: string;
  id: string;
  labelColor?: string;
  backgroundColor: string;
  label: string;
  icon?: ReactNode;
  placeholder?: string;
  onChangeHandler: () => void;
  onBlurHandler: () => void;
};

const Input = ({
  value,
  onChangeHandler,
  onBlurHandler,
  type,
  name,
  error,
  id,
  label,
  placeholder,
  labelColor,
  backgroundColor,
  icon,
}: Props) => {
  return (
    <div className="relative flex flex-col gap-1  ">
      <label htmlFor={name} className={`${labelColor || 'text-secondary'}`}>
        {label}
      </label>

      <div className={`relative w-full ${labelColor}`}>
        <input
          placeholder={placeholder || ''}
          name={name}
          type={type}
          id={id}
          className={`peer relative w-full rounded-lg ${backgroundColor} py-2  ${
            icon ? 'indent-8' : 'px-4'
          } outline-none transition-all  duration-200  ease-in-out `}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />

        {icon && (
          <div className=" absolute top-2/4 left-2 -translate-y-2/4 ">
            {icon}
          </div>
        )}
      </div>
      <span className="absolute top-full w-full  whitespace-pre-wrap text-red-500 ">
        <p className="font-light">{error}</p>
      </span>
    </div>
  );
};

export default Input;
