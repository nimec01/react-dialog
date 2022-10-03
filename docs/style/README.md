# Styling the dialog

### Overwriting the default styling

You can overwrite the following css classes to apply your own styles: <br/>

`.dialog__wrapper`: Styles for the background of the dialog<br/>

`.dialog__card`: Styles for the card<br/>

`.dialog__card__body`: Styles for the body of the card<br/>

`.dialog__card__actions`: Styles for the action group<br/>

`.dialog__button`: Styles for the buttons<br/>

`.dialog__success`: Styles for the confirm button<br/>

`.dialog__error`: Styles for the cancel button<br/>

_**Notice**: You can use the DevTools to play around with the styles in your browser._<br/>

### Adding your own classes

You can <b>add your own classes</b> to these components using the following properties on DialogComponent:

- `wrapperClassName`
- `cardClassName`
- `cardBodyClassName`
- `cardActionsClassName`
- `confirmButtonClassName`
- `cancelButtonClassName`

### Removing default classes

You can also <b>remove the default classes</b> by adding the property `removeDefaultClasses={true}` to DialogComponent.

### Using your own DialogComponent

You can <b>create your own DialogComponent</b> to apply your own styling. Here is an example on how to implement one:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { useDialog } from '@nick46000/react-dialog';
import { DialogVisibility } from '@nick46000/react-dialog/dist/dialog/DialogReducer';

export default function CustomDialog() {
  const { state, onConfirm, onCancel } = useDialog();

  const handleConfirm = () => {
    onConfirm();
  };

  const handleCancel = () => {
    onCancel();
  };

  return ReactDOM.createPortal(
    state.visibility === DialogVisibility.VISIBLE ? (
      <div>
        <div>{state.content}</div>
        <button onClick={handleConfirm}>Accept</button>
        <button onClick={handleCancel}>Decline</button>
      </div>
    ) : null,
    document.getElementById('dialog') as HTMLElement,
  );
}
```
