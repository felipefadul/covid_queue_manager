import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AuthenticationState } from 'react-aad-msal';
import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import CheckForValueJson from '../../utils/checkForValueJson'
import Unauthorized from '../Unauthorized';

const theme = createMuiTheme({
  shadows: ["none"],
})

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#FFF',
    color: theme.palette.common.white,
    borderBottom: "none"
  },
  body: {
    fontSize: 20,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Fulano da Silva 2', 4, '10:48', 24, 4.0),
  createData('Fulano da Silva 3', 3, '10:45', 37, 4.3),
  createData('Fulano da Silva 4', 2, '10:40', 24, 6.0),
  createData('Fulano da Silva 5', 1, '10:37', 67, 4.3),
];

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
  columnName: {
    color: '#008000',
    fontWeight: 'bold',
    fontSize: '1.3rem'
  },
  rowValue: {
    color: '#829882',
    fontWeight: 'bold',
    borderBottom: "none"
  }
});

export default function History() {
  const history = useHistory();
  const classes = useStyles();
  
  function handlePatientData() {
    axios.get(`http://localhost:3333/api/pacientes/consulta/989b5a51-3589-4a94-855f-74b80219315d`)
      .then(response => {
        const patient = response.data.paciente;
        localStorage.setItem('patient', JSON.stringify(patient));
        history.push('/paciente');
      })
      .catch(() => {});
  }

  function handleScreening() {
    history.push('/triagem');
  }
  const authenticationState = JSON.parse(localStorage.getItem('authenticationState'));
  const accountListGroups = JSON.parse(localStorage.getItem('accountListGroups'));
  const accountName = localStorage.getItem('accountName');
  if (authenticationState === AuthenticationState.Authenticated) {
    return (
      <S.HistoryContainer>
        <S.AppTitle>
          Sistema de Triagem - Coronavírus
        </S.AppTitle>
        <S.Content>
          <S.LastPatientContainer>
            <S.LastPatientContent>
              <S.LastPatientContentTitle>
                Paciente
              </S.LastPatientContentTitle>
              <S.LastPatientContentValue>
                FULANO DA SILVA <IconButton><SearchIcon/></IconButton>
              </S.LastPatientContentValue>
            </S.LastPatientContent>
            <S.LastPatientContent>
              <S.LastPatientContentTitle>
                  Sala
              </S.LastPatientContentTitle>
              <S.LastPatientContentValue className="room">
                5
              </S.LastPatientContentValue>
            </S.LastPatientContent>
          </S.LastPatientContainer>
          <S.HistoryContent>
            <S.HistoryContentTitle>
              Histórico de Chamadas
            </S.HistoryContentTitle>
            <ThemeProvider theme={theme}> 
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className={classes.columnName} align="center">Paciente</StyledTableCell>
                      <StyledTableCell className={classes.columnName} align="center">Sala</StyledTableCell>
                      <StyledTableCell className={classes.columnName} align="center">Horário da Chamada</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell className={classes.rowValue} align="left" component="th" scope="row">
                          {row.name.toUpperCase()}
                        </StyledTableCell>
                        <StyledTableCell className={classes.rowValue} align="center">{row.calories}</StyledTableCell>
                        <StyledTableCell className={classes.rowValue} align="center">{row.fat}</StyledTableCell>
                        <StyledTableCell className={classes.rowValue} align="center"><IconButton><SearchIcon/></IconButton></StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </ThemeProvider>
          </S.HistoryContent>
          <S.ButtonArea>
            {CheckForValueJson(accountListGroups,'21af395d-6321-4465-9a48-e1aa65178e01') ? <S.Button onClick = { handlePatientData }>CHAMAR PRÓXIMO PACIENTE</S.Button> : ''}
            {CheckForValueJson(accountListGroups,'77cdb68f-6363-41de-93e8-9e15f2938471') ? <S.Button onClick = { handleScreening }>REALIZAR TRIAGEM</S.Button>:''}            
          </S.ButtonArea>
        </S.Content>
        <GlobalStyle />
      </S.HistoryContainer>   
    );
  }
  else {
    return(
      <Unauthorized />
    )
  }
}

//ID grupo Medicos:       21af395d-6321-4465-9a48-e1aa65178e01
//ID grupo Enfermeiros:   77cdb68f-6363-41de-93e8-9e15f2938471