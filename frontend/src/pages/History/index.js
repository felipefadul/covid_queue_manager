import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthenticationState } from 'react-aad-msal';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import Unauthorized from '../Unauthorized';

export default function History() {
  const history = useHistory();
  
  function handlePatientData() {
    axios.get(`http://localhost:3333/api/pacientes/consulta/e80d0c2f-aed8-4963-a376-1f902a32648a`)
      .then(response => {
        const patient = response.data.paciente[0];
        localStorage.setItem('patient', JSON.stringify(patient));
        history.push('/paciente');
      })
      .catch(() => {});
  }

  function handleScreening() {
    history.push('/triagem');
  }
  const accountName = localStorage.getItem('accountName');
  const authenticationState = JSON.parse(localStorage.getItem('authenticationState'));
  if (authenticationState === AuthenticationState.Authenticated) {
    return (
      <S.HistoryContainer>
        <S.AppTitle>
          Sistema de Triagem - Coronavírus
        </S.AppTitle>
        <S.Content>
          Bem-vindo ao Histórico, {accountName}!
          <S.ButtonArea>
            <S.Button onClick = { handlePatientData }>
              CHAMAR PRÓXIMO PACIENTE
            </S.Button>
            <S.Button onClick = { handleScreening }>
              REALIZAR TRIAGEM
            </S.Button>
          </S.ButtonArea>
        </S.Content>
        <GlobalStyle />
      </S.HistoryContainer>   
    );
  }
  else {
    return(
      <Unauthorized />
    )
  }
}

//ID grupo Medicos:       21af395d-6321-4465-9a48-e1aa65178e01
//ID grupo Enfermeiros:   77cdb68f-6363-41de-93e8-9e15f2938471