import React from 'react';

type Props = {
  size: number;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
};

const Logo = ({ size, className, primaryColor, secondaryColor }: Props) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 358.687 414.16"
    >
      <g id="Group_1" data-name="Group 1">
        <path
          id="Path_2"
          data-name="Path 2"
          d="M202.568,244.758l104.277,60.2-39.834,23h0L135.3,404.011l67.268,38.832L381.907,339.3l.008-68.676L202.568,167.07Z"
          transform="translate(-23.228 -28.683)"
          className={`${primaryColor || 'fill-accent dark:fill-accent2'}`}
        />
        <path
          id="Path_3"
          data-name="Path 3"
          d="M199.994,0,120.31,46v77.672l50.271-29.024L199.994,77.68,379.342,181.212V103.54Z"
          transform="translate(-20.655)"
          className={`${secondaryColor || 'fill-accent2 dark:fill-accent'}`}
        />
        <path
          id="Path_4"
          data-name="Path 4"
          d="M67.276,242.349V78.11L0,116.95V324.03l79.684,46,67.268-38.84-79.676-46Z"
          transform="translate(0 -13.41)"
          className={`${primaryColor || 'fill-accent dark:fill-accent2'}`}
        />
      </g>
    </svg>
  );
};

export default Logo;
