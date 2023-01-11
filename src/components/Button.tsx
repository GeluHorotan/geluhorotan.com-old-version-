import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  rounded?: boolean;
  eventName?: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset';
};

const Button = ({
  children,
  className,
  rounded,

  type,
  ...rest
}: Props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      type={type}
      className={`${className} ${
        rounded && 'rounded-full'
      } flex w-max items-center justify-center  `}
      {...rest}
    >
      {children}
    </motion.button>
  );
};

export default Button;
