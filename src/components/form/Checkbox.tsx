import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';

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
}: Props) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (error) {
      controls.start({ x: [0, 3, 0] });
    }
  }, [error]);

  return (
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
        className="h-4 w-4 rounded border  border-accent  bg-secondary text-accent focus:outline-none focus:ring-0 focus:ring-transparent focus:ring-offset-transparent dark:border-accent2 dark:bg-primary dark:text-transparent checked:dark:border-accent2"
      />

      <label
        htmlFor={name}
        className={`items-center  gap-2 font-light  ${
          labelColor || 'text-primary dark:text-secondary'
        } `}
      >
        {label}
      </label>
    </motion.div>
  );
};

export default Checkbox;
