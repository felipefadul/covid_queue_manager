import React from 'react';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import { authProvider } from "../../authProvider";
export default function History() {

  return (
    <S.HistoryContainer>
      <S.AppTitle>
        Sistema de Triagem - Coronavírus
      </S.AppTitle>
      <S.Content>
        Bem-vindo ao Histórico, {authProvider.getAccountInfo()?.account.name}!
        <S.ButtonArea>
          <S.Button>
            CHAMAR PRÓXIMO PACIENTE
          </S.Button>
          <S.Button>
            REALIZAR TRIAGEM
          </S.Button>
        </S.ButtonArea>
      </S.Content>
      <GlobalStyle />
    </S.HistoryContainer>   
  );
}

//ID grupo Medicos:       21af395d-6321-4465-9a48-e1aa65178e01
//ID grupo Enfermeiros:   77cdb68f-6363-41de-93e8-9e15f2938471