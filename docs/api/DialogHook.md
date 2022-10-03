# useDialog Hook

A hook granting your application access to the state of the dialog and functions that open, confirm or cancel the dialog.

```tsx
const { openDialog, state, onConfirm, onCancel } = useDialog();
```

### Arguments

There are no arguments necessary.

### Returns

- result (Object)
  - openDialog (Function, see [openDialog API Documentation](api/openDialog.md))
  - state (DialogState, see [DialogState API Documentation](api/DialogState.md))
  - onConfirm (Function, see [onConfirm API Documentation](api/onConfirm.md))
  - onCancel (Function, see [onCancel API Documentation](api/onCancel.md))

### Example usage

Opening a new dialog:

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

Accessing state as well as confirm and cancel functions:

```tsx
import React, { useCallback } from 'react';

function Example() {
  const { state, onConfirm, onCancel } = useDialog();

  return (
    <div>
      <h1>{state.content}</h1>
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default Example;
```
