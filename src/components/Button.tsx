import { motion } from 'framer-motion';
import React from 'react';

import { cn } from '@/utils/cn';

type Props = {
  children: React.ReactNode;
  className?: string;
  rounded?: boolean;
  eventName?: string;
  disabled?: boolean;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
};

const Button = ({
  children,
  className,
  rounded,
  onClick,
  disabled,
  type,
  ...rest
}: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1, ease: 'easeInOut' }}
      type={type}
      className={cn(
        'flex items-center  justify-center rounded-full text-primary dark:text-secondary ',
        className
      )}
      {...rest}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
};

export default Button;
