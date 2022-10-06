import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/landing'
import Login from './pages/login'
import CadastraCliente from './pages/cadastro-cliente'
import CadastraProfissional from './pages/cadastro-profissional'
import PerfilProfissional from './pages/perfil-profissional'
import BuscaProf from './pages/page-busca'
import ServicosAtivos from './pages/servicos-ativos';
import SolicitarServ from './pages/solicitar-servico';
import Denunciar from './components/denuciar-perfil';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
         <Route path='/' element={<LandingPage />} />
         <Route path='/login' element={<Login />} />
         <Route path='/cadastro-cliente' element={<CadastraCliente />} />
         <Route path='/cadastro-profissional' element={<CadastraProfissional />} />
         <Route path='/perfil-profissional' element={<PerfilProfissional />} />
         <Route path='/perfil-profissional/:idParam' element={<PerfilProfissional />} />
         <Route path='/busca-profissional' element={<BuscaProf />} />
         <Route path='/servicos-ativos' element={<ServicosAtivos />} />
         <Route path='/solicitar-servico/:idParam' element={<SolicitarServ />} />
         <Route path='/denunciar' element={<Denunciar />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


