import React from 'react';

type Props = {
  horizontal?: boolean;
};

const Separator = ({ horizontal }: Props) => {
  return (
    <div
      className={`${
        horizontal ? 'h-[1px] w-full' : 'h-full w-[1px]'
      }  rounded-full bg-primary dark:bg-secondary_s`}
    ></div>
  );
};

export default Separator;
