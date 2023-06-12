import type { FC } from 'react';

interface Props {
  size?: string;
}

const Spinner: FC<Props> = ({ size }) => {
  const dimensions: { [key: string]: string } = {
    small: 'h-6 w-6 border-[0.2rem]',
    medium: 'h-12 w-12 border-[0.4rem]',
    large: 'h-24 w-24 border-[0.6rem]',
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-3">
      <div
        className={`${dimensions[size]} animate-spin rounded-full border-accent border-t-secondary_s_2 dark:border-accent2 dark:border-t-primary_t `}
      />
      {size === 'small' ? <p>Please wait...</p> : <h6>Please wait...</h6>}
    </div>
  );
};

export default Spinner;
