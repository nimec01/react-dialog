<h1 align="center">Welcome to @nick46000/react-dialog 👋</h1>
<p align="center">
  <a href="https://www.npmjs.com/package/@nick46000/react-dialog" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/@nick46000/react-dialog.svg">
  </a>
  <a href="https://github.com/Nick46000/react-dialog#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/Nick46000/react-dialog/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/Nick46000/react-dialog/blob/main/LICENSE.md" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/Nick46000/@nick46000/react-dialog" />
  </a>
</p>

> Dialog component for React

## Install

```sh
npm install --save @nick46000/react-dialog
or
yarn add @nick46000/react-dialog
```

## Usage

<b>1. Add an element with id 'dialog' to the body of your template file.</b>

public/index.html:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- HEAD CONTENT -->
  </head>
  <body>
    <!-- OTHER BODY CONTENT -->
    <div id="root"></div>
    <div id="dialog"></div>
    <!-- OTHER BODY CONTENT -->
  </body>
</html>
```

<b>2. Wrap your application with DialogProvider and add DialogComponent. Import the css file. </b>

src/index.tsx:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DialogProvider, DialogComponent } from '@nick46000/react-dialog';
import '@nick46000/react-dialog/dist/dialog/DialogComponent.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <DialogProvider>
    <App />
    <DialogComponent />
  </DialogProvider>,
);
```

<b>3. Use the useDialog hook in any component (this example will use App.tsx).</b>

```tsx
import React, { useCallback } from 'react';
import { useDialog } from '@nick46000/react-dialog';

function App() {
  const { openDialog } = useDialog();

  const handleClick = useCallback(async () => {
    const result = await openDialog('Are you sure?');

    if (result.confirmed) {
      // User confirmed
    } else {
      // User cancelled
    }
  }, [openDialog]);

  return (
    <div className="App">
      <button onClick={handleClick}>Open dialog</button>
    </div>
  );
}

export default App;
```

## Documentation

You can find further details in the [Documentation](docs/README.md)

## Author

👤 **Nick46000**

- Github: [@Nick46000](https://github.com/Nick46000)

This component is inspired by <a href="https://devrecipes.net/custom-confirm-dialog-with-react-hooks-and-the-context-api/">Alexander Rusev's article</a> on creating a custom confirm dialog.

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/Nick46000/react-dialog/issues). You can also take a look at the [contributing guide](https://github.com/Nick46000/react-dialog/blob/main/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Nick46000](https://github.com/Nick46000).<br />
This project is [MIT](https://github.com/Nick46000/react-dialog/blob/main/LICENSE) licensed.

---

_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
