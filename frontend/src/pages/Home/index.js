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