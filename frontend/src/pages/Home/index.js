import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AuthenticationState } from 'react-aad-msal';
import { authProvider } from "../../authProvider";

import * as S from './styled';
import GlobalStyle from '../../styles/global';

export default function Home() {
  const history = useHistory();
  const [loadingState, setLoadingState] = useState(false);
  
  async function handleAccess() {
    setLoadingState(true);
    await authProvider.login();
    setLoadingState(false);
    switch (authProvider.authenticationState) {
      case AuthenticationState.Authenticated:
        history.push('/history');
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