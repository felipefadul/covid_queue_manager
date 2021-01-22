import React from 'react';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import { authProvider } from "../../authProvider";
export default function History() {
  
  return (
    <S.HistoryContainer>
      Bem-vindo ao Histórico, {authProvider.getAccountInfo()?.account.name}!
      <GlobalStyle />
    </S.HistoryContainer>   
  );
}