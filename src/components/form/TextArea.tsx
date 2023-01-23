import React from 'react';

type Props = {
  value: string;

  name: string;
  error: string;
  id: string;

  label: string;
  backgroundColor: string;
  labelColor?: string;
  placeholder?: string;
  onChangeHandler: () => void;
  onBlurHandler: () => void;
};

const TextArea = ({
  value,
  onChangeHandler,
  onBlurHandler,

  name,
  error,
  id,
  label,
  placeholder,
  backgroundColor,
  labelColor,
}: Props) => {
  return (
    <div className="relative  flex h-full flex-col gap-1  ">
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
          className={`peer relative h-full w-full rounded-lg  ${backgroundColor} py-2 px-4 outline-none  transition-all  duration-200 ease-in-out`}
          value={value}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        {/* {getInputIcon(id, error) && (
          <div className=" absolute top-2/4 left-2 -translate-y-2/4 ">
            {getInputIcon(id, error)}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default TextArea;
