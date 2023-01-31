import { motion, useAnimationControls } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

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
  const controls = useAnimationControls();

  useEffect(() => {
    if (error) {
      controls.start({ x: [0, 5, 0, 5, 0] });
    }
  }, [error]);

  return (
    <TooltipProvider>
      <Tooltip>
        <motion.div
          initial={{ x: 0 }}
          animate={controls}
          transition={{ type: 'spring', duration: 0.1 }}
          className="relative flex flex-col gap-1  "
        >
          <label
            htmlFor={name}
            className={`${labelColor || 'text-secondary'} ${
              !error || 'text-error'
            } flex items-center gap-0.5`}
          >
            {label}
          </label>

          <div className={`relative w-full   ${labelColor}`}>
            <TooltipTrigger asChild>
              <input
                placeholder={placeholder || ''}
                name={name}
                type={type}
                id={id}
                className={`peer relative w-full rounded-lg ${backgroundColor} py-2  ${
                  icon ? 'indent-8' : 'px-4'
                }  outline-none ${
                  error ? 'border border-error' : ''
                }  transition-all  duration-100 ease-in-out `}
                value={value}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </TooltipTrigger>

            {error && (
              <TooltipContent className="bg-primary text-secondary">
                <p>{error}</p>
              </TooltipContent>
            )}

            {icon && (
              <div className=" absolute top-2/4 left-2 -translate-y-2/4 ">
                {icon}
              </div>
            )}
          </div>
        </motion.div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Input;
