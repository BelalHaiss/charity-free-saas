/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--text-color-secondary)'
      }
    }
  },
  plugins: []
};
