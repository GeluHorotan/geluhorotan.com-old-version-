import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/Tooltip';
import useMount from '@/customHooks/useMount';

type Props = {
  value: string;
  inputType: string;
  name: string;
  error: string;
  id: string;
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
  inputType,
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
  const [isMounted] = useMount();

  useEffect(() => {
    if (error) {
      controls.start({ x: [0, 3, 0] });
    }
  }, [error]);

  if (isMounted) {
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
              className={` flex items-center ${!error || '!text-error'}
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
                className={` peer  relative w-full border-0 border-b-2 border-b-accent bg-transparent py-2 px-0 text-base font-light    placeholder:text-secondary_s_2 focus:border-b-2   focus:ring-0 dark:border-b-accent2 dark:autofill:shadow-none  ${
                  reverseTextColor
                    ? ' text-primary  autofill:shadow-fill-secondary  '
                    : 'text-primary autofill:shadow-fill-secondary autofill:text-fill-primary  dark:text-secondary    dark:autofill:shadow-fill-primary  dark:autofill:text-fill-secondary  '
                }  `}
                placeholder={placeholder || ''}
                name={name}
                type={inputType}
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
  }
  return null;
};

export default Input;
