import type { FC } from 'react';

interface Props {
  size?: number;
}

const Spinner: FC<Props> = ({ size = 4 }) => {
  return (
    <div className="flex h-full w-full items-center justify-center gap-3">
      <div
        className={`h-${size} w-${size} border-accent_t_2 border-t-primary_t animate-spin rounded-full border-2`}
      />
      <p>Please wait...</p>
    </div>
  );
};

export default Spinner;
