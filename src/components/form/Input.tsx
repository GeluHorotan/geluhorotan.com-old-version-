import { motion, useAnimationControls } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

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
  labelColo?: string;
  isRequired: boolean;
  reverseTextColor: boolean;
  label: string;
  placeholder?: string;
  labelColor?: string;
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
  reverseTextColor,
  labelColor,
  isRequired,
}: Props) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (error) {
      controls.start({ x: [0, 3, 0] });
    }
  }, [error]);

  return (
    <TooltipProvider>
      <Tooltip>
        <motion.div
          initial={{ x: 0 }}
          animate={controls}
          transition={{ type: 'spring', duration: 0.1 }}
          className="relative flex w-full flex-col gap-1  "
        >
          <label
            htmlFor={name}
            className={` flex items-center
             gap-1 ${labelColor || 'text-primary dark:text-secondary'} `}
          >
            {error && (
              <TooltipTrigger className="flex ">
                <BiErrorCircle
                  className={`${
                    error ? 'text-error' : 'text-primary dark:text-secondary'
                  }`}
                  size={16}
                />
              </TooltipTrigger>
            )}
            {label}&nbsp;
            {isRequired && '*'}
          </label>

          <div className={` relative   `}>
            <input
              className={`peer relative w-full appearance-none  border-b-2 border-b-accent  bg-transparent py-2 pr-4 text-base font-light text-primary outline-none placeholder:text-secondary_s_2 dark:border-b-accent2  ${
                reverseTextColor
                  ? 'text-secondary dark:text-primary'
                  : 'text-primary dark:text-secondary'
              } `}
              placeholder={placeholder || ''}
              name={name}
              type={type}
              id={id}
              value={value}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />

            {error && (
              <TooltipContent>
                <p>{error}</p>
              </TooltipContent>
            )}
          </div>
        </motion.div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Input;
