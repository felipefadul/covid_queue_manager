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

  const handleChange = (event) => {
    setCheckedSymptom({ ...checkedSymptom, [event.target.name]: event.target.checked });
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
          <S.SectionTitle>
            Parte A - Quais sintomas o paciente apresenta?
          </S.SectionTitle>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom1} onChange={handleChange} name="checkedSymptom1" /></div>}
                  label="Febre"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom2} onChange={handleChange} name="checkedSymptom2" /></div>}
                  label="Dor/iritação na garganta"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom3} onChange={handleChange} name="checkedSymptom3" /></div>}
                  label="Dor de cabeça"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom4} onChange={handleChange} name="checkedSymptom4" /></div>}
                  label="Tosse seca ou com pouca secreção"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom5} onChange={handleChange} name="checkedSymptom5" /></div>}
                  label="Secreção nasal/espirros"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom6} onChange={handleChange} name="checkedSymptom6" /></div>}
                  label="Dificuldade respiratória/falta de ar"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom7} onChange={handleChange} name="checkedSymptom7" /></div>}
                  label="Dores no corpo"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom8} onChange={handleChange} name="checkedSymptom8" /></div>}
                  label="Diarreia"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom9} onChange={handleChange} name="checkedSymptom9" /></div>}
                  label="Perda/alteração de olfato"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom10} onChange={handleChange} name="checkedSymptom10" /></div>}
                  label="Perda/alteração do paladar"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom11} onChange={handleChange} name="checkedSymptom11" /></div>}
                  label="Cansaço"
                  labelPlacement="end"
                />
              </Grid>
              <Grid item md={6} sm={12}>
                <FormControlLabel
                  style={{ display: 'table' }}
                  control={<div style={{ display: 'table-cell' }}><GreenCheckbox checked={checkedSymptom.checkedSymptom12} onChange={handleChange} name="checkedSymptom12" /></div>}
                  label="Náusea/enjoo"
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