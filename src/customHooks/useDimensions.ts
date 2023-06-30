import { useEffect, useMemo, useRef } from 'react';

export const useDimensions = (ref: {
  current: { offsetWidth: number; offsetHeight: number };
}) => {
  const dimensionsRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    dimensionsRef.current.width = ref.current.offsetWidth;
    dimensionsRef.current.height = ref.current.offsetHeight;
  }, []);

  const dimensions = useMemo(() => dimensionsRef.current, []);

  return dimensions;
};
