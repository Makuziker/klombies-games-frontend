import { Grid, Typography, Button, TextField, makeStyles, CircularProgress } from '@material-ui/core';
import React, { useState, useCallback, FormEvent, ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { useRoute } from '../hooks';
import { apiSignUp, apiLogin, useAppSelectors, IApplicationState } from '../store';


export interface IAuthPageProps { }

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    marginTop: spacing(2)
  }
}));

export function AuthPage() {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmPrompt, setShowConfirmPrompt] = useState(false);

  const routes = useRoute();
  const dispatch = useDispatch();

  const { selectIsAuthenticated, selectUserSignedUp } = useAppSelectors();

  const { isAuthenticated, userSignedUp } = useSelector((state: IApplicationState) => ({
    isAuthenticated: selectIsAuthenticated(state),
    userSignedUp: selectUserSignedUp(state),
  }));

  useEffect(() => {
    if (userSignedUp) {
      setLoading(false);
      setShowConfirmPrompt(true);
    }
  }, [userSignedUp]);

  const handleSignUp = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (signupPassword !== confirmPassword) {
      setErrorMessage('Passwords must match');
    } else {
      dispatch(apiSignUp({ email, name, password: signupPassword }));
      // setLoading(true); // must turn off loading on error
    }
  }, [dispatch, name, email, signupPassword, confirmPassword]);

  const handleLogin = useCallback((e: FormEvent) => {
    e.preventDefault();
    dispatch(apiLogin({ email, password: loginPassword }));
    // setLoading(true);
  }, [dispatch, email, loginPassword]);

  const handleConfirmEmailDone = () => {
    setShowConfirmPrompt(false);
    setIsSignUp(false);
  }

  const toggleSignUp = () => {
    setIsSignUp(prevState => !prevState);
    setErrorMessage('');
  }

  const renderToggleAuthLabel = useCallback(
    () => isSignUp ? 'Switch to Login' : 'Switch to Sign Up',
    [isSignUp]
  );

  const renderAuthText = useCallback(
    () => isSignUp ? 'Create an Account' : 'Login',
    [isSignUp]
  );

  const renderCreateAccountButton = useCallback(
    () => loading ? <CircularProgress /> : 'Create Account',
    [loading]
  );

  const renderLoginButton = useCallback(
    () => loading ? <CircularProgress /> : 'Login',
    [loading]
  );

  const renderSignUpForm = () => (
    <form onSubmit={handleSignUp}>
      <TextField
        fullWidth
        label="Name"
        inputProps={{ maxLength: 20 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        value={name}
      />
      <TextField
        fullWidth
        label="Email"
        inputProps={{ maxLength: 30 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        inputProps={{ maxLength: 30 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSignupPassword(e.target.value)}
        value={signupPassword}
      />
      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        inputProps={{ maxLength: 30 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        value={confirmPassword}
      />
      {errorMessage && (
        <Typography color="error">{errorMessage}</Typography>
      )}
      <Button
        className={classes.button}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={!name || !email || !signupPassword || !confirmPassword || loading}
      >
        {renderCreateAccountButton()}
      </Button>
    </form>
  );

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <TextField
        fullWidth
        label="Email"
        inputProps={{ maxLength: 30 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        value={email}
      />
      <TextField
        fullWidth
        label="Password"
        type="password"
        inputProps={{ maxLength: 30 }}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setLoginPassword(e.target.value)}
        value={loginPassword}
      />
      {errorMessage && (
        <Typography color="error">{errorMessage}</Typography>
      )}
      <Button
        className={classes.button}
        fullWidth
        type="submit"
        variant="contained"
        color="primary"
        disabled={!email || !loginPassword || loading}
      >
        {renderLoginButton()}
      </Button>
    </form>
  );

  if (isAuthenticated) return (<Redirect push to={routes.home} />);

  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={10} md={6} lg={4} xl={3}>
        {showConfirmPrompt ? (
          <>
            <Typography>A confirmation email was sent. Confirm your email account to complete sign up.</Typography>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => console.log('resend the email please')}
            >
              Resend Email
            </Button>
            <Button
              className={classes.button}
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleConfirmEmailDone}
            >
              Done
            </Button>
          </>
        ) : (
            <>
              <Typography variant='h3' component='h3' align='center'>{renderAuthText()}</Typography>
              <Button
                className={classes.button}
                fullWidth
                variant="contained"
                color="secondary"
                onClick={toggleSignUp}
              >
                {renderToggleAuthLabel()}
              </Button>
              {isSignUp ? renderSignUpForm() : renderLoginForm()}
            </>
          )}
      </Grid>
    </Grid>
  );
}
