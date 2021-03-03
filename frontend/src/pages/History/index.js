import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthenticationState } from 'react-aad-msal';
import { authProvider } from "../../authProvider";
import { withStyles, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import * as S from './styled';
import GlobalStyle from '../../styles/global';

import CheckForValueJson from '../../utils/checkForValueJson';
import api from '../../services/api';


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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function History() {
  const history = useHistory();
  const classes = useStyles();

  const [historyData, setHistoryData] = useState([]);
  const [lastPatient, setLastPatient] = useState({});
  const [openWarningSnackbar, setOpenWarningSnackbar] = useState(false);
  const [time, setTime] = useState(Date.now());

  const handleOpenWarningSnackbar = () => {
    setOpenWarningSnackbar(true);
  };

  const handleCloseWarningSnackbar = () => {
    setOpenWarningSnackbar(false);
  };

  function handlePatientData(patientID) {
    api.get(`/api/pacientes/consulta/${patientID}`)
      .then(response => {
        const patient = response.data.paciente;
        localStorage.setItem('patient', JSON.stringify(patient));
        history.push('/paciente');
      })
      .catch(() => {});
  }

  async function handleCallNextPatient() {
    const data = {
      nome_medico: accountName,
      accountListGroups: accountListGroups
    };

    let patientID;

    await api.post(`/api/filas/chamar`, data)
      .then(response => {
        patientID = response.data.paciente_id;
      })
      .catch(() => {});

    patientID !== null ? handlePatientData(patientID) : handleOpenWarningSnackbar();
  }

  async function handleHistorySearch() {
    const visibility = (authenticationState === AuthenticationState.Authenticated) ? 'privado' : 'publico';
    
    await api.get(`/api/historico/consulta/${visibility}`)
    .then(response => {
      setLastPatient(response.data.historico[0]);
      setHistoryData(response.data.historico.slice(1));
    })
    .catch(() => {});
  }

  function handleScreening() {
    history.push('/triagem');
  }

  async function handleLogout() {
    localStorage.removeItem('authenticationState');
    localStorage.removeItem('accountListGroups');
    localStorage.removeItem('accountName');
    await authProvider.logout();
  }

  useEffect(() => {
    let interval = setInterval(() => setTime(Date.now()), 3000);
    handleHistorySearch();
    return () => {
      clearInterval(interval);
    };
  },  [history, time]);

  const authenticationState = JSON.parse(localStorage.getItem('authenticationState'));
  const accountListGroups = JSON.parse(localStorage.getItem('accountListGroups'));
  const accountName = localStorage.getItem('accountName');
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
              {lastPatient.nome_paciente?.toUpperCase()} 
              {CheckForValueJson(accountListGroups,'21af395d-6321-4465-9a48-e1aa65178e01') ? 
                <IconButton onClick = { () => handlePatientData(lastPatient.paciente_id) }>
                  <SearchIcon/>
                </IconButton> : ''}
            </S.LastPatientContentValue>
          </S.LastPatientContent>
          <S.LastPatientContent>
            <S.LastPatientContentTitle>
                Sala
            </S.LastPatientContentTitle>
            <S.LastPatientContentValue className="room">
              {lastPatient.sala_medico}
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
                  {historyData.map((row) => (
                    <StyledTableRow key={row.paciente_id}>
                      <StyledTableCell className={classes.rowValue} align="left" component="th" scope="row">
                        {row.nome_paciente.toUpperCase()}
                      </StyledTableCell>
                      <StyledTableCell className={classes.rowValue} align="center">{row.sala_medico}</StyledTableCell>
                      <StyledTableCell className={classes.rowValue} align="center">{row.data}</StyledTableCell>
                      {CheckForValueJson(accountListGroups,'21af395d-6321-4465-9a48-e1aa65178e01') ? 
                        <StyledTableCell className={classes.rowValue} align="center">
                          <IconButton onClick = { () => handlePatientData(row.paciente_id) }>
                            <SearchIcon/>
                          </IconButton>
                        </StyledTableCell> : ''}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ThemeProvider>
        </S.HistoryContent>
        <S.ButtonArea>
          {(authenticationState === AuthenticationState.Authenticated) ? <S.Button onClick = { handleLogout }>SAIR</S.Button>:''}
          {CheckForValueJson(accountListGroups,'21af395d-6321-4465-9a48-e1aa65178e01') ? <S.Button onClick = { handleCallNextPatient }>CHAMAR PRÓXIMO PACIENTE</S.Button> : ''}
          {CheckForValueJson(accountListGroups,'77cdb68f-6363-41de-93e8-9e15f2938471') ? <S.Button onClick = { handleScreening }>REALIZAR TRIAGEM</S.Button>:''}
          {(authenticationState !== AuthenticationState.Authenticated) ? <S.Button onClick = { () => history.push('/') }>VOLTAR</S.Button>:''}
        </S.ButtonArea>
        <Snackbar
          open={openWarningSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseWarningSnackbar}>
          <Alert
            onClose={handleCloseWarningSnackbar}
            severity="warning">
            {`Fila está vazia!`}
          </Alert>
        </Snackbar>
      </S.Content>
      <GlobalStyle />
    </S.HistoryContainer>   
  );
}

//ID grupo Medicos:       21af395d-6321-4465-9a48-e1aa65178e01
//ID grupo Enfermeiros:   77cdb68f-6363-41de-93e8-9e15f2938471