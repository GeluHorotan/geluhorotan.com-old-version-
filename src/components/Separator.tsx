import React from 'react';

type Props = {
  horizontal?: boolean;
};

const Separator = ({ horizontal }: Props) => {
  return (
    <div
      className={`${
        horizontal ? 'h-[3px] w-11/12' : 'h-full w-[1px]'
      } p rounded-full bg-secondary_s dark:bg-primary`}
    ></div>
  );
};

export default Separator;
