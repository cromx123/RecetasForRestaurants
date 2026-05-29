/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './context/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#121111',
        surface: '#1e1d1d',
        card: '#2a2929',
        border: '#3a3939',
        accent: '#8b5cf6',
        'accent-hover': '#7c3aed',
        'accent-light': '#a78bfa',
        muted: '#6b7280',
        danger: '#ef4444',
      },
    },
  },
  plugins: [],
};
