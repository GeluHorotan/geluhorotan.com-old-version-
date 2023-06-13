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
  value?: string;
  type: string;
  name: string;
  error?: string;
  id: string;
  label: string;
  isRequired?: boolean;
  labelColor?: string;
  onChangeHandler?: () => void;
  onBlurHandler?: () => void;
};

const Checkbox = ({
  value,
  onChangeHandler,
  onBlurHandler,
  type,
  name,
  error,
  id,
  label,
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
          className="relative flex w-full items-center  gap-2   "
        >
          <input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            className=" h-4 w-4  rounded border-gray-300 bg-gray-100 text-yellow-600 dark:border-gray-600 dark:bg-gray-700  "
          />
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

          {error && (
            <TooltipContent>
              <p>{error}</p>
            </TooltipContent>
          )}
          <label
            htmlFor={name}
            className={`items-center  gap-2 font-light  ${
              labelColor || 'text-primary dark:text-secondary'
            } `}
          >
            {label}
          </label>
        </motion.div>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Checkbox;
