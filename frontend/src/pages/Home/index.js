import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthenticationState } from 'react-aad-msal';
import { authProvider } from "../../authProvider";

import * as S from './styled';
import GlobalStyle from '../../styles/global';

//ID grupo Medicos:       21af395d-6321-4465-9a48-e1aa65178e01
//ID grupo Enfermeiros:   77cdb68f-6363-41de-93e8-9e15f2938471

export default function Home() {
  const history = useHistory();
  const [loadingState, setLoadingState] = useState(false);
  
  async function handleAccess() {
    setLoadingState(true);
    await authProvider.login();
    setLoadingState(false);
    switch (authProvider.authenticationState) {
      case AuthenticationState.Authenticated:
        history.push('/historico');
        setLoadingState(false);
        break;
      case AuthenticationState.Unauthenticated:
        setLoadingState(false);
        alert('Falha no login, tente novamente.');
        break;
      case AuthenticationState.InProgress:
        setLoadingState(true);
        break;
      default:
        setLoadingState(false);
    }
    localStorage.setItem('authenticationState', JSON.stringify(authProvider.authenticationState));
    localStorage.setItem('accountInfo', JSON.stringify(authProvider.getAccountInfo()));
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
        { loadingState ? <CircularProgress style={{color: '#006600', marginTop: 5}}/> : ''}
        </S.Content>
        <GlobalStyle />
      </S.HomeContainer>
  );
}