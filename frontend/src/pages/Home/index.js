import React from 'react';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

export default function Home() {

  return (
    <S.HomeContainer>
      <S.Content>
        <S.AppTitle>
          Sistema de Triagem <br /> Coronavírus
        </S.AppTitle>
        <S.Button>
          PAINEL DE ATENDIMENTO
        </S.Button>
        <S.Button>
          ÁREA RESTRITA
        </S.Button>
      </S.Content>
      <GlobalStyle />
    </S.HomeContainer>
  );
}