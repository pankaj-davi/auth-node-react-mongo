import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material/styles';

import { CssBaseline } from '@mui/material';
import theme from './themes';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(theme() , "theme()theme()")
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme()}>
      <CssBaseline />
        <App />
    </ThemeProvider>
  </React.StrictMode>
);

// reportWebVitals();
