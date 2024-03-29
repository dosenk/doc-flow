import * as React from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, CssBaseline, Avatar, Box, Typography, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import useNotification from '../../hooks/useNotification/useNotification';
import Preloader from '../../components/Preloader/Preloader';
import FormInput from '../../components/FormElements/FormInput/FormInput';
import styles from './Login.module.scss';
import Copyright from './Copyright/Copiright';
import { signInAction } from '../../store/auth/authActions';

// const passwordPattern =
//   "^(?=.*[0-9])(?=.*[!@#$%^&*()_+|~\\-=`\\{\\}\\[\\]:«;'<>?,.\\/])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()_+|~\\-=`\\{\\}\\[\\]:«;'<>?,.\\/]{8,25}$";

const Login = () => {
  const dispatch = useDispatch();
  const { error, status } = useSelector((state) => state.auth);
  const isLoading = status === 'loading';
  // const [initState, setInitState] = useState({
  //   login: '',
  //   password: ''
  // });
  const renderSnackBar = useNotification();
  console.log(error, status);
  useEffect(() => {
    if (status === 'failed') {
      renderSnackBar(error, 'error');
    }
  }, [status]);

  const handleSubmit = ({ login, password }) => {
    // setInitState({ login, password });
    // signIn(login, password);
    dispatch(signInAction({ login, password }));
    // setSubmitting(false);
    // resetForm({
    //   values: { login: "asda", password },
    // });
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <Container className={styles.login}>
      <CssBaseline />
      <Box className={styles.login__container}>
        <Avatar sx={{ m: 1, bgcolor: 'black' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Вход
        </Typography>
        <Formik
          initialValues={{
            login: '',
            password: ''
          }}
          // initialValues={initState}
          enableReinitialize
          validationSchema={Yup.object({
            login: Yup.string().max(15, 'Must be 15 characters or less').required('Введите логин'),
            password: Yup.string()
              .max(20, 'Must be 20 characters or less')
              .required('Введите пароль')
          })}
          onSubmit={handleSubmit}
        >
          <Form className={styles.login__container_form}>
            <FormInput
              id="login"
              name="login"
              type="text"
              label="Логин"
              placeholder="Введите логин"
            />
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Пароль"
              placeholder="Введите пароль"
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
              Войти
            </Button>
          </Form>
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Login;

// Login.propTypes = {
//   auth: PropTypes.shape({
//     isLoading: PropTypes.bool,
//     error: PropTypes.string
//   }),
//   signIn: PropTypes.func,
//   setError: PropTypes.func
// };
