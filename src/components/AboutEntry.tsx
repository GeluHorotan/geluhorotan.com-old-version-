import Image from 'next/image';
import type { FC } from 'react';
import React from 'react';

type Props = {
  id: string;
  imgSrc: string;
  children: React.ReactNode;
  title: string;
  isReversed?: boolean;
  colorScheme: keyof ColorMap;
  objectPosition?: string;
};

type ColorMap = {
  reverse: string;
  normal: string;
};

const AboutEntry: FC<Props> = ({
  children,
  id,
  title,
  imgSrc,
  colorScheme,
  isReversed,
  objectPosition,
}) => {
  const colorMap: ColorMap = {
    reverse: 'bg-primary text-secondary dark:bg-secondary dark:text-primary',
    normal: ' bg-secondary text-primary dark:bg-primary dark:text-secondary',
  };
  return (
    <section
      id={id}
      className={`${colorMap[colorScheme as keyof ColorMap]} container  flex ${
        isReversed && 'flex-row-reverse'
      }  items-center justify-center  !px-0 max-[850px]:!h-max  max-[850px]:!min-h-max max-[850px]:flex-col max-[850px]:gap-20 max-[850px]:pb-20 `}
    >
      <div className="relative h-screen w-[50vw] overflow-hidden  max-[850px]:h-[50vh] max-[850px]:w-full">
        <Image
          src={imgSrc}
          alt={id}
          fill={true}
          sizes="(max-width: 1920) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={`${
            objectPosition || 'object-center'
          } inset-0 block h-auto w-full object-cover `}
        />
      </div>
      <aside className="flex w-1/2 flex-col gap-6  px-8 max-[850px]:w-full">
        <h2 className="font-semibold uppercase">{title}</h2> <p> {children}</p>
      </aside>
    </section>
  );
};

export default AboutEntry;
