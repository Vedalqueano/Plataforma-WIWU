import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProcessCreation from './pages/ProcessCreation';
import PlaceholderPage from './pages/PlaceholderPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="processos" element={<ProcessCreation />} />
          <Route path="tarefas" element={<PlaceholderPage title="Tarefas" />} />
          <Route path="presenca" element={<PlaceholderPage title="Presença" />} />
          <Route path="treinamentos" element={<PlaceholderPage title="Treinamentos" />} />
          <Route path="eventos" element={<PlaceholderPage title="Eventos" />} />
          <Route path="visitas" element={<PlaceholderPage title="Visitas" />} />
          <Route path="salas" element={<PlaceholderPage title="Sala" />} />
          <Route path="equipe" element={<PlaceholderPage title="Equipe" />} />
          <Route path="relatorios" element={<PlaceholderPage title="Relatórios" />} />
          <Route path="politicas" element={<PlaceholderPage title="Políticas" />} />
          <Route path="comercial" element={<PlaceholderPage title="Comercial" />} />
          <Route path="metas" element={<PlaceholderPage title="Metas" />} />
          <Route path="gestao" element={<PlaceholderPage title="Gestão" />} />
          <Route path="clientes" element={<PlaceholderPage title="Cliente" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
