import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { DialogProvider, DialogComponent } from '../src/index';
import '../src/dialog/DialogComponent.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <DialogProvider>
      <App />
      <DialogComponent />
    </DialogProvider>
  </React.StrictMode>,
);
