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