import plugin from 'tailwindcss/plugin';
import forms from '@tailwindcss/forms';
import tailwindcssRTL from 'tailwindcss-rtl';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // Remove darkMode: 'class' if it exists - we won't use toggling
  theme: {
    extend: {
      // Add RTL-specific utilities
      rtl: {
        'flex-direction': 'row-reverse',
        'text-align': 'right',
      },
      // Define your dark theme colors
      colors: {
        darkBg: '#121212', // or any dark color you prefer
        darkText: '#f3f4f6',
      },
    },
  },
  plugins: [
    forms,
    tailwindcssRTL,
    // Force dark mode with a plugin
    plugin(function({ addBase }) {
      addBase({
        ':root': {
          'color-scheme': 'dark',
        },
        'html, body': {
          'background-color': '#121212',
          'color': '#f3f4f6',
        },
      });
    }),
  ],
};