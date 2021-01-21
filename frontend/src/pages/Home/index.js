import React from 'react';

import { authProvider } from "../../authProvider";

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import { store } from '../../reduxStore';

export default function Home() {
  function handleAccess() {
    authProvider.login();
    console.log(authProvider.getAccountInfo());
  }

  return (
    <S.HomeContainer>
        <S.Content>
          <S.AppTitle>
            Sistema de Triagem <br /> Coronavírus
        </S.AppTitle>
          <S.Button>
            PAINEL DE ATENDIMENTO
        </S.Button>
          <S.Button onClick={handleAccess}>
            ÁREA RESTRITA
          </S.Button>
        </S.Content>
        <GlobalStyle />
      </S.HomeContainer>
  );
}


{/* <AzureAD provider={authProvider} forceLogin={true} reduxStore={store}>
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
</AzureAD> */}