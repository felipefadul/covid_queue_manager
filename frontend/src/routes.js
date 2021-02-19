import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import History from './pages/History';
import Screening from './pages/Screening';
import Patient from './pages/Patient';
import Unauthorized from './pages/Unauthorized';
export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/historico" component={History} />
        <Route path="/triagem" component={Screening} />
        <Route path="/paciente" component={Patient} />
        <Route path="/naoAutorizado" component={Unauthorized} />
      </Switch>
    </BrowserRouter>
  );
}