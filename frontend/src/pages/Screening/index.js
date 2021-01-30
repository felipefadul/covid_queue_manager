import React from 'react';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  inputText: {
    //backgroundColor: '#006600'
    margin: '.5rem 0 0 1rem'
  }
}));
export default function Screening() {
  const classes = useStyles();

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
                <ThemeProvider theme={ theme }>
                  <TextField id="outlined-basic" className={classes.inputText} label="Nome" variant="outlined"/>
                </ThemeProvider>
              </Grid>
              <Grid item>
                <ThemeProvider theme={ theme }>
                  <TextField id="outlined-basic" className={classes.inputText} label="Idade" variant="outlined"/>
                </ThemeProvider>
              </Grid>
              <Grid item>
                <ThemeProvider theme={ theme }>
                  <TextField id="outlined-basic" className={classes.inputText} label="Peso (kg)" variant="outlined"/>
                </ThemeProvider>
              </Grid>
              <Grid item>
                <ThemeProvider theme={ theme }>
                  <TextField id="outlined-basic" className={classes.inputText} label="Altura (cm)" variant="outlined"/>
                </ThemeProvider>
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