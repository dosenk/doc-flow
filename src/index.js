import React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { createTheme, ThemeProvider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { teal, blueGrey, lime } from '@mui/material/colors';
import App from './App';
import store from './store/store';
import history from './components/Router/history';
import { getAccessToken, removeAccessToken } from './services/auth.service';
import { checkAuthAction } from './store/auth/authActions';
import { logout } from './store/auth/authReducer';

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

if (getAccessToken()) store.dispatch(checkAuthAction());
else {
  removeAccessToken();
  store.dispatch(logout());
}

const RootApp = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <ThemeProvider theme={theme}>
          <SnackbarProvider maxSnack={3} classes={{ variantSuccess: classes.success }}>
            <App />
          </SnackbarProvider>
        </ThemeProvider>
      </HistoryRouter>
    </Provider>
  );
};

root.render(<RootApp />);

// If you
// want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
