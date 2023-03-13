import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#121214',
      '850': '#272727',
      '800': '#202024',
      '750': '#2C2E32',
      '700': '#323239',
      '600': '#525252',
      '500': '#666666',
      '450': '#6c757d',
      '400': '#565663',
      '300': '#c4c4cc',
      '200': '#cccccc',
      '150': '#DADADA',
      '100': '#e1e1e6',
      '50': '#F5F8FA',
    },
    black: {
      '900': '#000000',
    },
    white: {
      '900': '#FFFFFF',
    },
    green: {
      '500': '#00875f',
      '300': '#00b37e',
    },
    blue: {
      '400': '#2684ff',
    },
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  components: {
    Button: {
      variants: {
        primary: {
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          textTransform: 'capitalize',
          color: 'white',
          bg: 'green.300',
          transition: 'filter 250ms ease-in-out',
          _hover: {
            filter: 'brightness(0.75)',
          },
        },
        danger: {
          fontSize: '1rem',
          fontWeight: '500',
          cursor: 'pointer',
          textTransform: 'capitalize',
          color: 'white',
          bg: 'red.400',
          transition: 'filter 250ms ease-in-out',
          _hover: {
            filter: 'brightness(0.75)',
          },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.750',
        color: 'gray.100',
      },
    },
  },
});
