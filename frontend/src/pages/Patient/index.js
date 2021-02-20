import React from 'react';
import { useHistory } from 'react-router-dom';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import green from '@material-ui/core/colors/green';

import Unauthorized from '../Unauthorized';
import { AuthenticationState } from 'react-aad-msal';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  inputText: {
    marginTop: '1rem'
  }
}));
export default function Screening() {
  const classes = useStyles();
  const history = useHistory();
  
  const patient = JSON.parse(localStorage.getItem('patient'));
  const classificationColor = chooseClassificationColor(patient.classificacao);
  
  function chooseClassificationColor(patientClassification) {
    if (patientClassification === 'Sem Sintomas')
      return '#829882';
    else if (patientClassification === 'Risco Baixo')
      return '#229422';
    else if (patientClassification === 'Risco Moderado')
      return '#E1931E';
    else if (patientClassification === 'Risco Alto')
      return '#D41A1A';
  }

  function handleNavigationBack() {
    history.push('/historico');
  }

  const authenticationState = JSON.parse(localStorage.getItem('authenticationState'));

  if (authenticationState === AuthenticationState.Authenticated) {
    return (
      <S.ScreeningContainer>
        <S.AppTitle>
          Sistema de Triagem - Coronavírus
        </S.AppTitle>
        <S.Content>
          <S.PatientScreeningContainer>
            <S.PageTitle>
              Triagem do Paciente
            </S.PageTitle>
            <S.ClassificationRowContainer>
              <S.ClassificationContainer classificationColor={classificationColor}>
                <S.ClassificationTitle classificationColor={classificationColor}>
                  {patient.classificacao}
                </S.ClassificationTitle>
              </S.ClassificationContainer>
            </S.ClassificationRowContainer> 
            <S.SectionTitle>
              Dados Pessoais
            </S.SectionTitle>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item>
                  <S.SectionContainer>
                    <S.SectionItem>
                      Nome:
                    </S.SectionItem>
                    <S.SectionItemValue>
                      {patient.nome}
                    </S.SectionItemValue>
                  </S.SectionContainer>
                </Grid>
                <Grid item>
                  <S.SectionContainer>
                    <S.SectionItem>
                      Idade:
                    </S.SectionItem>
                    <S.SectionItemValue>
                      {patient.idade}
                    </S.SectionItemValue>
                  </S.SectionContainer>
                </Grid>
                <Grid item>
                  <S.SectionContainer>
                    <S.SectionItem>
                      Peso:
                    </S.SectionItem>
                    <S.SectionItemValue>
                      {patient.peso}
                    </S.SectionItemValue>
                  </S.SectionContainer>
                </Grid>
                <Grid item>
                  <S.SectionContainer>
                    <S.SectionItem>
                      Altura:
                    </S.SectionItem>
                    <S.SectionItemValue>
                      {patient.altura}
                    </S.SectionItemValue>
                  </S.SectionContainer>
                </Grid>
              </Grid>
            </div>
            <S.SectionTitle style={{marginTop: '2rem'}}>
              Parte A - Quais sintomas o paciente apresenta?
            </S.SectionTitle>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom1} name="checkedSymptom1" disabled={true} /></div>}
                    label="Febre"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom2} name="checkedSymptom2" disabled={true} /></div>}
                    label="Dor/iritação na garganta"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom3} name="checkedSymptom3" disabled={true} /></div>}
                    label="Dor de cabeça"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom4} name="checkedSymptom4" disabled={true} /></div>}
                    label="Tosse seca ou com pouca secreção"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom5} name="checkedSymptom5" disabled={true} /></div>}
                    label="Secreção nasal/espirros"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom6} name="checkedSymptom6" disabled={true} /></div>}
                    label="Dificuldade respiratória/falta de ar"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom7} name="checkedSymptom7" disabled={true} /></div>}
                    label="Dores no corpo"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom8} name="checkedSymptom8" disabled={true} /></div>}
                    label="Diarreia"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom9} name="checkedSymptom9" disabled={true} /></div>}
                    label="Perda/alteração de olfato"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom10} name="checkedSymptom10" disabled={true} /></div>}
                    label="Perda/alteração do paladar"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom11} name="checkedSymptom11" disabled={true} /></div>}
                    label="Cansaço"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.sintomas.checkedSymptom12} name="checkedSymptom12" disabled={true} /></div>}
                    label="Náusea/enjoo"
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
            </div>
            <S.SectionTitle style={{marginTop: '1rem'}}>
              Parte B - Quais fatores de risco o paciente possui?
            </S.SectionTitle>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor1} name="checkedRiskFactor1" disabled={true} /></div>}
                    label="Hipertensão"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor2} name="checkedRiskFactor2" disabled={true} /></div>}
                    label="Diabetes"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor3} name="checkedRiskFactor3" disabled={true} /></div>}
                    label="Doença respiratória pré-existente (Ex.: Asma, ...)"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor4} name="checkedRiskFactor4" disabled={true} /></div>}
                    label="Obesidade"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor5} name="checkedRiskFactor5" disabled={true} /></div>}
                    label="Problemas no coração (Ex.: angina, insuficiência cardíaca, ...)"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor6} name="checkedRiskFactor6" disabled={true} /></div>}
                    label="Câncer"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor7} name="checkedRiskFactor7" disabled={true} /></div>}
                    label="Doença renal (nos rins)"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={patient.json_respostas.fatoresRisco.checkedRiskFactor8} name="checkedRiskFactor8" disabled={true} /></div>}
                    label="Maior de 60 anos"
                    labelPlacement="end"
                  />
                </Grid>
              </Grid>
            </div>
          </S.PatientScreeningContainer>
          <S.ButtonArea>
            <S.Button onClick = { handleNavigationBack }>
              VOLTAR
            </S.Button>
            <S.Button>
              CHAMAR PRÓXIMO PACIENTE
            </S.Button>
          </S.ButtonArea>
        </S.Content>
        <GlobalStyle />
      </S.ScreeningContainer>
    );
  }
  else {
    return(
      <Unauthorized />
    )
  }
}