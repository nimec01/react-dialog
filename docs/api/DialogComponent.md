# DialogComponent

Component that shows the dialog.

!> This is component uses the React Portal API. To use this component, add an element with id 'dialog' to the template file.

!> This component uses the DialogState provided by DialogProvider. Make sure the DialogComponent is wrapped inside the DialogProvider.

### Props

You can provide any prop of the [DialogOptions](api/DialogOptions.md) interface

### Example usage

```tsx
import React from 'react';
import { DialogProvider, DialogComponent } from '@nick46000/react-dialog';

function Example() {
  return (
    <DialogProvider>
      <DialogComponent
        removeDefaultClasses={true}
      />
    </DialogProvider>,
  )
}

export default Example;
```
