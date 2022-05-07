import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const defaultTheme = createTheme();

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'dashed' },
          style: {
            textTransform: 'none',

          },
        },
        {
          props: { variant: 'dashed', color: 'secondary' },
          style: {
           
          },
        },
        {
          props: { variant: 'dashed', size: 'large' },
          style: {
            borderWidth: 4,
          },
        },
        {
          props: { variant: 'dashed', color: 'secondary', size: 'large' },
          style: {
            fontSize: 18,
          },
        },
      ],
    },
  },
});

export default function GlobalThemeVariants(props) {
  return (
    <ThemeProvider theme={theme}>
      <Button href={props.href} variant='' sx={{ m: 1 }}>
        Dashed
      </Button>

    </ThemeProvider>
  );
}
