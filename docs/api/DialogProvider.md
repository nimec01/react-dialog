# DialogProvider

This component is responsible for for exposing the internal api to the DialogComponent and useDialog Hook.
This ensures that the dialog can be shown and properly managed by the useDialog Hook.

### Props

This component has no properties.

### Example usage

index.tsx:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DialogProvider } from '@nick46000/react-dialog';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <DialogProvider>
    <App />
    <DialogComponent />
  </DialogProvider>,
);
```
