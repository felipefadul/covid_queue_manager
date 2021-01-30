import React, { useState } from 'react';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import { createMuiTheme, makeStyles, withStyles, ThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import green from '@material-ui/core/colors/green';

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
export default function Screening() {
  const classes = useStyles();

  const [checkedSymptom, setCheckedSymptom] = useState({
    checkedSymptom1: true,
    checkedSymptom2: true,
    checkedSymptom3: true,
    checkedSymptom4: true,
    checkedSymptom5: true,
    checkedSymptom6: true,
    checkedSymptom7: true,
    checkedSymptom8: true,
    checkedSymptom9: true,
    checkedSymptom10: true,
    checkedSymptom11: true,
    checkedSymptom12: true,
  });

  const [checkedRiskFactor, setCheckedRiskFactor] = useState({
    checkedRiskFactor1: true,
    checkedRiskFactor2: true,
    checkedRiskFactor3: true,
    checkedRiskFactor4: true,
    checkedRiskFactor5: true,
    checkedRiskFactor6: true,
    checkedRiskFactor7: true,
    checkedRiskFactor8: true
  });

  const handleSymptomChange = (event) => {
    setCheckedSymptom({ ...checkedSymptom, [event.target.name]: event.target.checked });
  };

  const handleRiskFactorChange = (event) => {
    setCheckedRiskFactor({ ...checkedRiskFactor, [event.target.name]: event.target.checked });
  };

  return (
    <S.ScreeningContainer>
      <S.AppTitle>
        Sistema de Triagem - Coronavírus
      </S.AppTitle>
      <S.Content>
        <S.PacientScreeningContainer>
          <S.PageTitle>
            Triagem do Paciente
          </S.PageTitle>
          <S.SectionTitle>
            Dados Pessoais
          </S.SectionTitle>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item>
                <ThemeProvider theme={theme}>
                  <TextField id="outlined-basic" className={classes.inputText} label="Nome" variant="outlined" />
                </ThemeProvider>
              </Grid>
              <Grid item>
                <ThemeProvider theme={theme}>
                  <TextField id="outlined-basic" className={classes.inputText} label="Idade" variant="outlined" />
                </ThemeProvider>
              </Grid>
              <Grid item>
                <ThemeProvider theme={theme}>
                  <TextField id="outlined-basic" className={classes.inputText} label="Peso (kg)" variant="outlined" />
                </ThemeProvider>
              </Grid>
              <Grid item>
                <ThemeProvider theme={theme}>
                  <TextField id="outlined-basic" className={classes.inputText} label="Altura (cm)" variant="outlined" />
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
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom1} onChange={handleSymptomChange} name="checkedSymptom1" /></div>}
                  label="Febre"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom2} onChange={handleSymptomChange} name="checkedSymptom2" /></div>}
                  label="Dor/iritação na garganta"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom3} onChange={handleSymptomChange} name="checkedSymptom3" /></div>}
                  label="Dor de cabeça"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom4} onChange={handleSymptomChange} name="checkedSymptom4" /></div>}
                  label="Tosse seca ou com pouca secreção"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom5} onChange={handleSymptomChange} name="checkedSymptom5" /></div>}
                  label="Secreção nasal/espirros"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom6} onChange={handleSymptomChange} name="checkedSymptom6" /></div>}
                  label="Dificuldade respiratória/falta de ar"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom7} onChange={handleSymptomChange} name="checkedSymptom7" /></div>}
                  label="Dores no corpo"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom8} onChange={handleSymptomChange} name="checkedSymptom8" /></div>}
                  label="Diarreia"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom9} onChange={handleSymptomChange} name="checkedSymptom9" /></div>}
                  label="Perda/alteração de olfato"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom10} onChange={handleSymptomChange} name="checkedSymptom10" /></div>}
                  label="Perda/alteração do paladar"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom11} onChange={handleSymptomChange} name="checkedSymptom11" /></div>}
                  label="Cansaço"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom12} onChange={handleSymptomChange} name="checkedSymptom12" /></div>}
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
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor1} onChange={handleRiskFactorChange} name="checkedRiskFactor1" /></div>}
                  label="Hipertensão"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor2} onChange={handleRiskFactorChange} name="checkedRiskFactor2" /></div>}
                  label="Diabetes"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor3} onChange={handleRiskFactorChange} name="checkedRiskFactor3" /></div>}
                  label="Doença respiratória pré-existente (Ex.: Asma, ...)"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor4} onChange={handleRiskFactorChange} name="checkedRiskFactor4" /></div>}
                  label="Obesidade"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor5} onChange={handleRiskFactorChange} name="checkedRiskFactor5" /></div>}
                  label="Problemas no coração (Ex.: angina, insuficiência cardíaca, ...)"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor6} onChange={handleRiskFactorChange} name="checkedRiskFactor6" /></div>}
                  label="Câncer"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor7} onChange={handleRiskFactorChange} name="checkedRiskFactor7" /></div>}
                  label="Doença renal (nos rins)"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedRiskFactor.checkedRiskFactor8} onChange={handleRiskFactorChange} name="checkedRiskFactor8" /></div>}
                  label="Maior de 60 anos"
                  labelPlacement="end"
                />
              </Grid>
            </Grid>
          </div>
        </S.PacientScreeningContainer>
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
    </S.ScreeningContainer>
  );
}