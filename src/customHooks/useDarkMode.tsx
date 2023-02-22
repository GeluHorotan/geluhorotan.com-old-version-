import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const useDarkMode = (): [
  Theme,
  React.Dispatch<React.SetStateAction<Theme>>
] => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage.getItem('theme')) {
      return window.localStorage.getItem('theme') as Theme;
    }
    return 'light';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('theme', 'light');
      }
    }
  }, [theme]);

  return [theme, setTheme];
};

export default useDarkMode;
