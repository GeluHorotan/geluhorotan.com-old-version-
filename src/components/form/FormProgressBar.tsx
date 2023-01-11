import { useFormikContext } from 'formik';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

type Form = {
  values: {
    [key: string]: any;
  };
  errors: {
    [key: string]: any;
  };
};

const FormProgressBar = () => {
  const { values, errors } = useFormikContext<Form>();
  const [completionPercentage, setCompletionPercentage] = useState(0);

  const animation = useAnimation();

  const phrases = [
    "You're doing great! Just keep it up.",
    "Don't worry, the end is in sight!",
    'Almost there! Just a few more steps.',
    "Hang in there! You're almost done.",
    "Don't give up now! You're almost there.",
    "Keep going! You're doing a great job.",
    'The finish line is in sight! Just keep pushing.',
    'You can do this! Almost there.',
    "Don't worry, the end is near! Just a little bit more.",
    "You're almost done! Just a few more steps.",
    "Just a little bit longer, and you'll be finished!",
  ];

  // Calculate the progress based on the number of filled and valid form fields
  const filledAndValidFields = (
    values: Form['values'],
    errors: Form['errors']
  ) => {
    return Object.keys(values).filter(
      (key) => values[key].length !== 0 && !errors[key]
    ).length;
  };
  const validFields = filledAndValidFields(values, errors);

  const totalFields = Object.keys(values).length;
  const progress = validFields / totalFields;

  const calculatePercentage = () => {
    const percentage = (progress * 100).toFixed(2);

    setCompletionPercentage(Number(percentage));
  };

  useEffect(() => {
    calculatePercentage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  useEffect(() => {
    // Update the progress animation when the form values or errors change
    animation.set({ width: `${Number(progress) * 100}%` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, errors]);

  return (
    <AnimatePresence>
      <div className="flex flex-col ">
        <div className="flex  items-center justify-between ">
          <p>{phrases[validFields]}</p>
          <div className=" flex items-center justify-center gap-2">
            {validFields === totalFields ? (
              <p>COMPLETED!</p>
            ) : (
              <p>IN PROGRESS</p>
            )}
            <h6>{completionPercentage} %</h6>
          </div>
        </div>

        <div className="h-2 w-full rounded-full bg-primary_t_2 ">
          <motion.div
            className="h-2 rounded-full bg-blue-400"
            animate={animation}
            exit={{ width: 0 }}
          />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default FormProgressBar;
