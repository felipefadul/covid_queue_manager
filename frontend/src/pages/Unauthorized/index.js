import React from 'react';
import { useHistory } from 'react-router-dom';


import * as S from './styled';
import GlobalStyle from '../../styles/global';

export default function History() {
  const history = useHistory();

  function handleUnauthorized() {
    history.push('/');
  }
  return (
    <S.HistoryContainer>
    <S.AppTitle>
      Sistema de Triagem - Coronavírus
    </S.AppTitle>
    <S.Content>
      Acesso não autorizado! Favor voltar para página principal.
      <S.ButtonArea>
      <S.Button onClick = { handleUnauthorized }>
        VOLTAR
      </S.Button>
      </S.ButtonArea>
    </S.Content>
    <GlobalStyle />
    </S.HistoryContainer>   
  );
}


//ID grupo Medicos:       21af395d-6321-4465-9a48-e1aa65178e01
//ID grupo Enfermeiros:   77cdb68f-6363-41de-93e8-9e15f2938471