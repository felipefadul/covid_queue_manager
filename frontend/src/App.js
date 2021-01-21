import { AzureAD, AuthenticationState} from "react-aad-msal";
import { authProvider } from "./authProvider";
import { store } from './reduxStore';
import React from 'react'


function App() {
  return (
  <AzureAD provider={authProvider} forceLogin={true} reduxStore={store}>
  {
    ({login, logout, authenticationState, error, accountInfo}) => {
      switch (authenticationState) {
        case AuthenticationState.Authenticated:
          return (
            <p>
              <span>Welcome, {console.log(accountInfo)} !</span>
              <button onClick={logout}>Logout</button>
            </p>
          );
        case AuthenticationState.Unauthenticated:
          return (
            <div>
              {error && <p><span>An error occurred during authentication, please try again!</span></p>}
              <p>
                <span>Hey stranger, you look new!</span>
                <button onClick={login}>Login</button>
              </p>
            </div>
          );
        case AuthenticationState.InProgress:
          return (<p>Authenticating...</p>);
      }
    }
  }
</AzureAD>
 
  );
}

export default App;
