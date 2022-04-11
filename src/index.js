import React, { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { teal, blueGrey, lime } from '@mui/material/colors';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const theme = createTheme({
  palette: {
    primary: {
      main: teal[800]
    },
    secondary: {
      main: blueGrey[800],
      light: blueGrey[500]
    },
    info: {
      main: lime[800]
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1024,
      lg: 1300,
      xl: 1536
    }
  }
});

const useStyles = makeStyles(() => ({
  success: {
    backgroundColor: `${theme.palette.primary.main} !important`
  }
}));

const RootApp = () => {
  const classes = useStyles();
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} classes={{ variantSuccess: classes.success }}>
              <App />
            </SnackbarProvider>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

root.render(<RootApp />);

// If you
// want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
