import { defaultTheme } from '@xstyled/styled-components';

const theme = {
  ...defaultTheme,

  colors: {
    ...defaultTheme.colors,
    grey: '#f4f4f5',
    'light-grey': '#f8f8fa',
    primary: '#b41d76',
    text: {
      primary: '#353449',
      secondary: '#92929d',
    },
  },
};

export default theme;
