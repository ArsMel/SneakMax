import React from 'react';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './routes';
import './styles/global.scss'

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
};

export default App;