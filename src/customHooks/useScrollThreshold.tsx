import { useCallback, useEffect, useState } from 'react';

const useScrollThreshold = (threshold: number) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > threshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }, [threshold]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return { isScrolled };
};

export default useScrollThreshold;
