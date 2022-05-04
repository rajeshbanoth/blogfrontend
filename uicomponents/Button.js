import * as React from 'react';
import Button from '@mui/material/Button';
import { purple } from '@mui/material/colors';

import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: purple[500],
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

export default function IconLabelButtons({variant,label,onclick,color,startIcon}) {
  return (




<ThemeProvider theme={theme}>

<Button  variant={variant||"outlined" }startIcon={startIcon} color={'primary'||color}>
        {label||"Button"}
      </Button>
      <Button variant='secondary'>primay</Button>
</ThemeProvider>
    


  );
}


