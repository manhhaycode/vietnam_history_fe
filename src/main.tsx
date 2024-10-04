import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { makeServer } from '../mocks/server.ts';

if (import.meta.env.DEV) {
  makeServer({ environment: 'development' });
}

document.documentElement.classList.add('dark');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
