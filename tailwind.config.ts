import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors : {
        primaryGreen : {
          50 : '#e8ebe8',
          100 : '#B9C0B8',
          200 : '#97A296',
          300 : '#677766',
          400 : '#495D48',
          500 : '#15340B',
          600 : '#192F18',
          700 : '#142512',
          800 : '#0F1D0E',
          900 : '#0F1D0E'
        },
        secondaryYellow : {
          50 : '#FCFCEF',
          100 : '#F5F7CF',
          200 : '#F0F3B7',
          300 : '#E9EE96',
          400 : '#E5EA82',
          500 : '#DEE563',
          600 : '#CAD05A',
          700 : '#9EA346',
          800 : '#7A7E36',
          900 : '#5D602A'
        },
        grayScale : {
          50 : '#E9E9E9',
          100 : '#BBBBBB',
          200 : '#9A9A9A',
          300 : '#6C6C6C',
          400 : '#505050',
          500 : '#242424',
          600 : '#212121',
          700 : '#1A1A1A',
          800 : '#141414',
          900 : '#0F0F0F'
        },
        success : {
          50 : '#E7F5EC',
          100 : '#B5DFC3',
          200 : '#91CFA6',
          300 : '#5EB97D',
          400 : '#3FAC64',
          500 : '#0F973D',
          600 : '#0E8938',
          700 : '#0B6B2B',
          800 : '#085322',
          900 : '#063F1A'
        },
        warning : {
          50 : '#FFFBE7',
          100 : '#FFF2B3',
          200 : '#FFEC8E',
          300 : '#FFE45B',
          400 : '#FFDE3B',
          500 : '#FFD60A',
          600 : '#E8C309',
          700 : '#B59807',
          800 : '#8C7606',
          900 : '#6B5A04'
        },
        error : {
          50 : '#FBE9E9',
          100 : '#F2BCBA',
          200 : '#EB9B98',
          300 : '#E26E6A',
          400 : '#DD514D',
          500 : '#D42620',
          600 : '#C1231D',
          700 : '#971B17',
          800 : '#751512',
          900 : '#59100D'
        },
        neutral : {
          white : '#FFFFFF',
          black : '#000000',
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        // Set Poppins as default sans font
        'sans': ['var(--font-poppins)', 'ui-sans-serif', 'system-ui'],
        // Or create a custom font class
        'poppins': ['var(--font-poppins)', 'sans-serif'],
      },
      spacing: {
        level1: '8px',
        level2: '16px',
        level3: '24px',
        level4: '32px',
        level5: '40px',
        level6: '56px',
        level7: '72px',
        level8: '80px',
        level9: '96px',
        level10: '120px'
      }
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ],
};
export default config;