import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import { createMuiTheme, makeStyles, withStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import green from '@material-ui/core/colors/green';

import Unauthorized from '../Unauthorized';
import { AuthenticationState } from 'react-aad-msal';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: green[500],
    },
  },
});

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function Screening() {
  const classes = useStyles();

  const [checkedSymptom, setCheckedSymptom] = useState({
    checkedSymptom1: false,
    checkedSymptom2: false,
    checkedSymptom3: false,
    checkedSymptom4: false,
    checkedSymptom5: false,
    checkedSymptom6: false,
    checkedSymptom7: false,
    checkedSymptom8: false,
    checkedSymptom9: false,
    checkedSymptom10: false,
    checkedSymptom11: false,
    checkedSymptom12: false,
  });

  const [checkedRiskFactor, setCheckedRiskFactor] = useState({
    checkedRiskFactor1: false,
    checkedRiskFactor2: false,
    checkedRiskFactor3: false,
    checkedRiskFactor4: false,
    checkedRiskFactor5: false,
    checkedRiskFactor6: false,
    checkedRiskFactor7: false,
    checkedRiskFactor8: false
  });

  const handleSymptomChange = (event) => {
    setCheckedSymptom({ ...checkedSymptom, [event.target.name]: event.target.checked });
  };

  const handleRiskFactorChange = (event) => {
    setCheckedRiskFactor({ ...checkedRiskFactor, [event.target.name]: event.target.checked });
  };

  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleOpenSuccessSnackbar = () => {
    setOpenSuccessSnackbar(true);
  };

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
  };

  const handleOpenErrorSnackbar = () => {
    setOpenErrorSnackbar(true);
  };

  const handleCloseErrorSnackbar = () => {
    setOpenErrorSnackbar(false);
  };

  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [patientWeight, setPatientWeight] = useState('');
  const [patientHeight, setPatientHeight] = useState('');
  const [patientClassification, setPatientClassification] = useState('');
  const [classificationColor, setClassificationColor] = useState('#004D00');
  const [disabled, setDisabled] = useState(false);
  const [registeredPatient, setRegisteredPatient] = useState(false);

  const patientData = {
    personalData: {
      patientName,
      patientAge,
      patientWeight,
      patientHeight,
      patientClassification
    },
    checkedSymptom,
    checkedRiskFactor
  }

  const history = useHistory();

  function handleNavigationBack() {
    history.push('/historico');
  }

  function chooseClassificationColor(patientClassification) {
    if (patientClassification === 'Sem Sintomas')
      setClassificationColor('#829882');
    else if (patientClassification === 'Risco Baixo')
      setClassificationColor('#229422');
    else if (patientClassification === 'Risco Moderado')
      setClassificationColor('#E1931E');
    else if (patientClassification === 'Risco Alto')
      setClassificationColor('#D41A1A');
  }

  async function handleRegister() {

    const data = {
      nome: patientData.personalData.patientName,
      idade: patientData.personalData.patientAge,
      peso: patientData.personalData.patientWeight,
      altura: patientData.personalData.patientHeight,
      json_respostas: {
        sintomas: patientData.checkedSymptom,
        fatoresRisco: patientData.checkedRiskFactor
      }
    }

    try {
      const response = await api.post('/api/pacientes/cadastro', data);
      if (response.status === 200)
      {
        handleOpenSuccessSnackbar();

        const patientClassification = response.data.classificacao[0].descricao;
        
        setPatientClassification(patientClassification);

        chooseClassificationColor(patientClassification);

        if (patientClassification !== '')
        {
          setDisabled(true);
          setRegisteredPatient(true)
        }
      }

    } catch (err) {
      handleOpenErrorSnackbar();
    }

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
            {registeredPatient ? 
            <S.ClassificationRowContainer>
              <S.ClassificationContainer classificationColor={classificationColor}>
                <S.ClassificationTitle classificationColor={classificationColor}>
                  {patientData.personalData.patientClassification}
                </S.ClassificationTitle>
              </S.ClassificationContainer>
            </S.ClassificationRowContainer> 
            : ''}
            <S.SectionTitle>
              Dados Pessoais
            </S.SectionTitle>
            <div className={classes.root}>
              <Grid container spacing={3}>
                <Grid item>
                  <ThemeProvider theme={theme}>
                    <TextField id="outlined-basic" className={classes.inputText} value={patientName} onChange={e => setPatientName(e.target.value)} label="Nome" variant="outlined" disabled={disabled} />
                  </ThemeProvider>
                </Grid>
                <Grid item>
                  <ThemeProvider theme={theme}>
                    <TextField id="outlined-basic" className={classes.inputText} value={patientAge} onChange={e => setPatientAge(e.target.value)} label="Idade" variant="outlined" disabled={disabled} />
                  </ThemeProvider>
                </Grid>
                <Grid item>
                  <ThemeProvider theme={theme}>
                    <TextField id="outlined-basic" className={classes.inputText} value={patientWeight} onChange={e => setPatientWeight(e.target.value)} label="Peso (kg)" variant="outlined" disabled={disabled} />
                  </ThemeProvider>
                </Grid>
                <Grid item>
                  <ThemeProvider theme={theme}>
                    <TextField id="outlined-basic" className={classes.inputText} value={patientHeight} onChange={e => setPatientHeight(e.target.value)} label="Altura (m)" variant="outlined" disabled={disabled} />
                  </ThemeProvider>
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
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom1} onChange={handleSymptomChange} name="checkedSymptom1" disabled={disabled} /></div>}
                    label="Febre"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom2} onChange={handleSymptomChange} name="checkedSymptom2" disabled={disabled} /></div>}
                    label="Dor/iritação na garganta"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom3} onChange={handleSymptomChange} name="checkedSymptom3" disabled={disabled} /></div>}
                    label="Dor de cabeça"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom4} onChange={handleSymptomChange} name="checkedSymptom4" disabled={disabled} /></div>}
                    label="Tosse seca ou com pouca secreção"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom5} onChange={handleSymptomChange} name="checkedSymptom5" disabled={disabled} /></div>}
                    label="Secreção nasal/espirros"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom6} onChange={handleSymptomChange} name="checkedSymptom6" disabled={disabled} /></div>}
                    label="Dificuldade respiratória/falta de ar"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom7} onChange={handleSymptomChange} name="checkedSymptom7" disabled={disabled} /></div>}
                    label="Dores no corpo"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom8} onChange={handleSymptomChange} name="checkedSymptom8" disabled={disabled} /></div>}
                    label="Diarreia"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom9} onChange={handleSymptomChange} name="checkedSymptom9" disabled={disabled} /></div>}
                    label="Perda/alteração de olfato"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom10} onChange={handleSymptomChange} name="checkedSymptom10" disabled={disabled} /></div>}
                    label="Perda/alteração do paladar"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom11} onChange={handleSymptomChange} name="checkedSymptom11" disabled={disabled} /></div>}
                    label="Cansaço"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom12} onChange={handleSymptomChange} name="checkedSymptom12" disabled={disabled} /></div>}
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
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor1} onChange={handleRiskFactorChange} name="checkedRiskFactor1" disabled={disabled} /></div>}
                    label="Hipertensão"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor2} onChange={handleRiskFactorChange} name="checkedRiskFactor2" disabled={disabled} /></div>}
                    label="Diabetes"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor3} onChange={handleRiskFactorChange} name="checkedRiskFactor3" disabled={disabled} /></div>}
                    label="Doença respiratória pré-existente (Ex.: Asma, ...)"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor4} onChange={handleRiskFactorChange} name="checkedRiskFactor4" disabled={disabled} /></div>}
                    label="Obesidade"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor5} onChange={handleRiskFactorChange} name="checkedRiskFactor5" disabled={disabled} /></div>}
                    label="Problemas no coração (Ex.: angina, insuficiência cardíaca, ...)"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor6} onChange={handleRiskFactorChange} name="checkedRiskFactor6" disabled={disabled} /></div>}
                    label="Câncer"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor7} onChange={handleRiskFactorChange} name="checkedRiskFactor7" disabled={disabled} /></div>}
                    label="Doença renal (nos rins)"
                    labelPlacement="end"
                  />
                </Grid>
                <Grid item md={6} sm={12}>
                  <FormControlLabel
                    style={{ display: 'table' }}
                    control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor8} onChange={handleRiskFactorChange} name="checkedRiskFactor8" disabled={disabled} /></div>}
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
            {!registeredPatient ? 
            <S.Button onClick = { handleRegister } >
              CADASTRAR
            </S.Button>
            : ''}
          </S.ButtonArea>
          <Snackbar
            open={openSuccessSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseSuccessSnackbar}>
            <Alert
              onClose={handleCloseSuccessSnackbar}
              severity="success"
              iconMapping={{ success: <CheckCircleOutlineIcon fontSize="inherit" /> }}>
              Paciente cadastrado com sucesso!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={5000}
            onClose={handleCloseErrorSnackbar}>
            <Alert
              onClose={handleCloseErrorSnackbar}
              severity="error">
              {`Falha no cadastro!\nPreencha todos os campos de Dados Pessoais corretamente e tente novamente.`}
            </Alert>
          </Snackbar>
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