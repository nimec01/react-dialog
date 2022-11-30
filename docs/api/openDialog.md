# openDialog Function

> This function is available through the useDialog Hook.

An async function opening the dialog.

```tsx
const result = await openDialog('Are you sure?');
// or
const result = await openDialog(<span className="custom-class">Are you sure?</span>);
// or
openDialog('Are you sure?', res => {
  console.log(result);
});
```

### Arguments

- content (string or ReactNode, content to display in the dialog)
- options ([DialogOptions](api/DialogOptions.md), options for the dialog, optional)
- callback (function with result object as argument, alternative for promise, optional)

### Returns

- result (Object or undefined)
  - confirmed (bool, wether the user confirmed or canceled the dialog)
  - value (Object or undefined, optional data returned by onConfirm or onCancel)

### Behaviour with the default DialogComponent implementation

Using the provided DialogComponent has the following benefits:

- It is possible to add input elements providing a name property as an argument of openDialog. The onConfirm and onCancel functions arguments used in the component will have the values of these input elements in an object of key-value pairs. You can find an example of this behavior in the example section below.

### Example usage

```tsx
import React, { useCallback } from 'react';

function Example() {
  const { openDialog } = useDialog();

  const handleClick = useCallback(() => {
    const result = await openDialog('Are you sure?');

    if (result.confirmed) {
      // Do something
    } else {
      // Do something
    }
  }, [openDialog]);

  return <button onClick={handleClick}>Open dialog</button>;
}

export default Example;
```

Usage with input elements:

```jsx
import React, { useCallback } from 'react';

function Example() {
  const { openDialog } = useDialog();

  const handleClick = useCallback(() => {
    const result = await openDialog(
      <>
        What is your name?
        <input name="username" placeholder="Your name" />
      </>
    );

    if (result.confirmed) {
      console.log(result.value) // { "username": "<VALUE OF THE INPUT ELEMENT>" }
    } else {
      console.log(result.value) // { "username": "<VALUE OF THE INPUT ELEMENT>" }
    }
  }, [openDialog]);

  return <button onClick={handleClick}>Open dialog</button>;
}

export default Example;
```

Usage with callback function:

```jsx
import React, { useCallback } from 'react';

function Example() {
  const { openDialog } = useDialog();

  const handleClick = useCallback(() => {
    openDialog('Are you sure?', {}, result => {
      if (result.confirmed) {
        // DO SOMETHING
      } else {
        // DO SOMETHING
      }
    });
  }, [openDialog]);

  return <button onClick={handleClick}>Open dialog</button>;
}

export default Example;
```
