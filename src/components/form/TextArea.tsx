import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { BiErrorCircle } from 'react-icons/bi';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip';

type Props = {
  value: string;

  name: string;
  error: string;
  id: string;
  labelColor?: string;
  label: string;
  placeholder?: string;
  onChangeHandler: () => void;
  onBlurHandler: () => void;
  reverseTextColor?: boolean;
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
  reverseTextColor,
  labelColor,
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
          className="relative flex  flex-col gap-1   "
        >
          <label
            htmlFor={name}
            className={` ${!error || 'text-error'} ${
              labelColor || 'text-primary dark:text-secondary'
            }  flex items-center gap-1`}
          >
            {error && (
              <TooltipTrigger className="flex ">
                <BiErrorCircle
                  className={`${error ? 'text-error' : labelColor}`}
                  size={16}
                />
              </TooltipTrigger>
            )}
            {label}
          </label>{' '}
          {error && (
            <TooltipContent className="bg-primary text-secondary">
              <p>{error}</p>
            </TooltipContent>
          )}{' '}
          {error && (
            <TooltipContent className="bg-primary text-secondary">
              <p>{error}</p>
            </TooltipContent>
          )}
          <div className=" relative w-full ">
            <textarea
              placeholder={placeholder || ''}
              name={name}
              id={id}
              className={`peer  relative w-full border-0 border-b-2 border-b-accent bg-transparent py-2 px-0 text-base font-light    placeholder:text-secondary_s_2 focus:border-b-2   focus:ring-0 dark:border-b-accent2 dark:autofill:shadow-none ${
                reverseTextColor
                  ? ' text-primary  autofill:shadow-fill-secondary  '
                  : 'text-primary autofill:shadow-fill-secondary autofill:text-fill-primary  dark:text-secondary    dark:autofill:shadow-fill-primary  dark:autofill:text-fill-secondary  '
              } `}
              value={value}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            />
          </div>
        </motion.div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TextArea;
