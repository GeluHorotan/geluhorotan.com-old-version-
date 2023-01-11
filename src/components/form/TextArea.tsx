import React from 'react';

import getInputIcon from '@//utils/getInputIcon';

type Props = {
  value: string;
  type: string;
  name: string;
  error: string;
  id: string;

  label: string;
  labelColor?: string;
  placeholder?: string;
  onChangeHandler: () => void;
  onBlurHandler: () => void;
};

const TextArea = ({
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
    <div className="relative flex h-full flex-col gap-1  ">
      <label htmlFor={name} className={`${labelColor || 'text-secondary'}`}>
        {label}
      </label>
      {/* <span className='text-red-500 absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4   w-full'>
            {error}
         </span> */}
      <div className=" relative w-full ">
        <textarea
          placeholder={placeholder || ''}
          name={name}
          // type={type}
          id={id}
          className={`peer relative w-full rounded-lg bg-secondary_s py-2 transition-all duration-200  ease-in-out ${
            getInputIcon(id, error) ? 'px-8' : 'px-2'
          } h-full outline-none`}
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
    </div>
  );
};

export default TextArea;
