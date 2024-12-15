import plugin from 'tailwindcss/plugin';
import forms from '@tailwindcss/forms';
import tailwindcssRTL from 'tailwindcss-rtl';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      // Add RTL-specific utilities
      rtl: {
        'flex-direction': 'row-reverse',
        'text-align': 'right',
      }
    },
  },
  plugins: [
    forms,
    tailwindcssRTL, // Recommended RTL plugin
  ],
};