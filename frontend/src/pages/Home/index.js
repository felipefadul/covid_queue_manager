import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { AuthenticationState } from 'react-aad-msal';
import { authProvider } from "../../authProvider";

import * as S from './styled';
import GlobalStyle from '../../styles/global';

//ID grupo Medicos:       21af395d-6321-4465-9a48-e1aa65178e01
//ID grupo Enfermeiros:   77cdb68f-6363-41de-93e8-9e15f2938471

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Home() {
  const history = useHistory();
  const [loadingState, setLoadingState] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleOpenErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  
  async function handleAccess() {
    setLoadingState(true);
    await authProvider.login();
    setLoadingState(false);
    switch (authProvider.authenticationState) {
      case AuthenticationState.Authenticated:
        localStorage.setItem('authenticationState', JSON.stringify(authProvider.authenticationState));
        localStorage.setItem('accountName', authProvider.getAccountInfo().account.name);
        localStorage.setItem('accountListGroups', JSON.stringify(authProvider.getAccountInfo().account.idToken.groups));
        history.push('/historico');
        setLoadingState(false);
        break;
      case AuthenticationState.Unauthenticated:
        setLoadingState(false);
        handleOpenErrorSnackbar();
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
        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseErrorSnackbar}>
          <Alert
            onClose={handleCloseErrorSnackbar}
            severity="error">
            Falha no login, tente novamente!
          </Alert>
        </Snackbar>
        </S.Content>
        <GlobalStyle />
      </S.HomeContainer>
  );
}