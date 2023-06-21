import type { FC } from 'react';

interface Props {
  size?: string;
  noText?: boolean;
}

const Spinner: FC<Props> = ({ size, noText }) => {
  const dimensions: { [key: string]: string } = {
    small: 'h-4 w-4 border-[0.2rem]',
    medium: 'h-8 w-8 border-[0.3rem]',
    large: 'h-12 w-12 border-[0.4rem]',
  };

  return (
    <div className="flex h-full w-full items-center justify-center gap-3">
      <div
        className={`${dimensions[size]} animate-spin rounded-full border-accent border-t-secondary_s_2 dark:border-accent2 dark:border-t-primary_t `}
      />
      {size === 'small' && !noText && <p>Please wait...</p>}
      {!noText && size !== 'small' && <h6>Please wait...</h6>}
    </div>
  );
};

export default Spinner;
