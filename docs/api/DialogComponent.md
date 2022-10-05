# DialogComponent

Component that shows the dialog.

!> This is component uses the React Portal API. To use this component, add an element with id 'dialog' to the template file.

!> This component uses the DialogState provided by DialogProvider. Make use the DialogComponent is wrapped inside the DialogProvider.

### Props

`closeOnOffsiteClick`: When true, close the dialog when clicking off the dialog

- type: bool
- default value: true

`closeOnEscape`: When true, close the dialog when pressing the Escape key

- type: bool
- default value: true

`removeDefaultClasses`: When true, remove the default css classes

- type: bool
- default value: false

`wrapperClassName`: Classes added to the wrapper

- type: string
- default value: ''

`cardClassName`: Classes added to the card

- type: string
- default value: ''

`cardBodyClassName`: Classes added to the card body

- type: string
- default value: ''

`cardActionsClassName`: Classes added to the card action wrapper

- type: string
- default value: ''

`confirmButtonClassName`: Classes added to the confirm button

- type: string
- default value: ''

`cancelButtonClassName`: Classes added to the cancel button

- type: string
- default value: ''

`confirmButtonLabel`: Label for the confirm button

- type: string
- default value: 'Yes'

`cancelButtonLabel`: Label for the cancel button

- type: string
- default value: 'Yes'

`disableConfirmButton`: When true, hides the confirm button

- type: bool
- default value: false

`confirmButtonLabel`: When true, hides the cancel button

- type: bool
- default value: false

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
