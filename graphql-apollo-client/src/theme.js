import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';
import '@fontsource/source-sans-pro';

const theme = extendTheme({
  fonts: {
    heading: `'Source Sans Pro', sans-serif`,
    body: `'Source Sans Pro', sans-serif`,
  },
  colors: {
    primary: '#2170cb',
    dark1: '#060f2f',
    dark2: '#1a2240',
    gray1: '#566992',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      'html, body': {
        backgroundColor: 'dark1',
      },
    },
  },
  components: {
    Modal: {
      baseStyle: props => ({
        dialog: {
          bg: mode('', '#1a2240')(props),
        },
      }),
    },
  },
});

export default theme;
