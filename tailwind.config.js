export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        plum: { 950: '#1c0a24', 900: '#2a1136', 800: '#3b1a4a', 700: '#52275f' },
        blush: { DEFAULT: '#f7d6df', deep: '#eab4c4' },
        cream: '#fbf3e6',
        ink: '#23202a',
      },
      fontFamily: { display: ['"Playfair Display"', 'Georgia', 'serif'], sans: ['"DM Sans"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
