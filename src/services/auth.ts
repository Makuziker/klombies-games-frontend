import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserSession } from 'amazon-cognito-identity-js';
import { MiddlewareAPI } from 'redux';
import { UserPool } from '../constants';
import { userLoggedIn, userSignedUp } from '../store';
import { ISignUpProps, ILoginProps } from './types';


export function signUp({ email, name, password }: ISignUpProps, store: MiddlewareAPI) {
  const dataName = {
    Name: 'name',
    Value: name
  };
  const attributeName = new CognitoUserAttribute(dataName);
  UserPool.signUp(email, password, [attributeName], [], (err, data) => {
    if (err || data === undefined) {
      console.error(err);
      alert(err?.message || JSON.stringify(err));
    } else {
      console.log(data);
      store.dispatch(userSignedUp({ data }));
    }
  });
}

export function login({ email, password }: ILoginProps, store: MiddlewareAPI) {
  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password
  });

  const cognitoUser = new CognitoUser({
    Username: email,
    Pool: UserPool
  });

  cognitoUser.authenticateUser(authDetails, {
    onSuccess: data => {
      console.log('onSuccess', data);
      store.dispatch(userLoggedIn({ data }));
    },
    onFailure: err => {
      console.error(err);
      alert(err.message || JSON.stringify(err));
    },
    newPasswordRequired: data => {
      console.log(data);
    }
  });
}

export function getSession() {
  return new Promise<CognitoUserSession>((resolve, reject) => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.getSession((err: Error | null, session: null | CognitoUserSession) => {
        if (err || !session) {
          reject();
        } else {
          resolve(session);
        }
      });
    } else {
      reject();
    }
  });
}

export function userIsAuthenticated() {
  getSession()
    .then(session => {
      return session.isValid()
    })
    .catch(() => {
      return false
    });
}

export function logout() {
  const user = UserPool.getCurrentUser();
  if (user) {
    user.signOut();
  }
}