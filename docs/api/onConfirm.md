# onConfirm Function

> This function is available through the useDialog Hook.

A function to be called when the user confirms the dialog.

```tsx
onConfirm();
// or
onConfirm({
  custom: 'data',
});
//or
onConfirm(
  {
    custom: 'data',
  },
  'id',
);
```

### Arguments

_These arguments are optional_

- props (any, data to be available in the openDialog result)
- id (string, identification for different dialogs)

### Returns

This function does not return anything.

### Example usage

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
