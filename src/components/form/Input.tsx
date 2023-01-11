import React from 'react';

import getInputIcon from '@/utils/getInputIcon';

type Props = {
  value: string;
  type: string;
  name: string;
  error: string;
  id: string;
  labelColor?: string;
  label: string;

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
}: Props) => {
  return (
    <div className="relative flex flex-col gap-1  ">
      <label htmlFor={name} className={`${labelColor || 'text-secondary'}`}>
        {label}
      </label>

      <div className=" relative w-full ">
        <input
          placeholder={placeholder || ''}
          name={name}
          type={type}
          id={id}
          className={`peer relative w-full rounded-lg bg-primary_t py-2 transition-all duration-200  ease-in-out ${
            getInputIcon(id, error) ? 'px-8' : 'px-2'
          } outline-none`}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        {getInputIcon(id, error) && (
          <div className=" absolute top-2/4 left-2 -translate-y-2/4 ">
            {getInputIcon(id, error)}
          </div>
        )}
      </div>
      <span className="absolute top-full w-full  whitespace-pre-wrap text-red-500 ">
        {error}
      </span>
    </div>
  );
};

export default Input;
