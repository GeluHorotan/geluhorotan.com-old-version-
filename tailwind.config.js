/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/pages/*.{html,js,jsx,tsx}',
    './src/pages/*/*.{html,js,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
    './src/components/*/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    clipPath: {
      rightPoint: 'polygon(0% 0%, 75% 0%, 100% 50%, 75% 100%, 0% 100%);',
      chevronRight:
        'polygon(75% 0%, 100% 50%, 75% 100%, 0% 100%, 25% 50%, 0% 0%);',
    },
    extend: {
      colors: {
        primary_s_2: '#0d0d0d',
        primary_s: '#151515',
        primary: '#1A1A1A',
        primary_t: '#343434',
        primary_t_2: '#484848',
        secondary_s_2: '#cacaca',
        secondary_s: '#e3e3e3',
        secondary: '#FCFCFC',
        secondary_t: '#fdfdfd',
        secondary_t_2: '#fefefe',
        accent_s_2: '#4e42a3',
        accent_s: '#574bb8',
        accent: '#6153CC',
        accent_t: '#7164d1',
        accent_t_2: '#8175d6',
        accent2_s_2: '#c25014',
        accent2_s: '#da5a17',
        accent2: '#F26419',
        accent2_t: '#f37430',
        accent2_t_2: '#f58347',
        success: '#47A025',
        error: '#D62828',
        error_s: '#ab2020',
      },
      fontFamily: {
        exosoft: ['exo-soft', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  // #343434
  plugins: [
    require('@headlessui/tailwindcss'),
    require('tailwindcss-animate'),
    { prefix: 'ui' },
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('tailwindcss-writing-mode')({
      variants: ['responsive', 'hover'],
    }),
  ],
};
