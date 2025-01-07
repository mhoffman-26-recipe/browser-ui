import { createTheme } from '@mui/material/styles';

const getCSSVariableValue = (variableName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();


// Fetch resolved values for CSS variables
const primaryColor = getCSSVariableValue('--primary-color');
const secondaryColor = getCSSVariableValue('--secondary-color');
const backgroundColor = getCSSVariableValue('--background-color');
const textColor = getCSSVariableValue('--text-primary');
const fontFamily = getCSSVariableValue('--font-family');

export const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    background: {
      default: backgroundColor,
    },
    text: {
      primary: textColor,
    },
  },
  typography: {
    fontFamily: fontFamily,
    // fontSize: 16, // Material UI requires a number, use directly
  },
});
