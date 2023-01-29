import type { ReactNode } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';

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
    <TooltipProvider>
      <Tooltip>
        <div className="relative flex flex-col gap-1  ">
          <label
            htmlFor={name}
            className={`${
              labelColor || 'text-secondary '
            } flex items-center gap-0.5`}
          >
            {label}
          </label>

          <div className={`relative w-full  ${labelColor}`}>
            <TooltipTrigger asChild>
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
            </TooltipTrigger>

            <TooltipContent className="bg-primary text-secondary">
              <p>{error}</p>
            </TooltipContent>

            {icon && (
              <div className=" absolute top-2/4 left-2 -translate-y-2/4 ">
                {icon}
              </div>
            )}
          </div>
        </div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Input;
