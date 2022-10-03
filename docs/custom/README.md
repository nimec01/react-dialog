# Creating your own dialog

First of all create a simple react component that houses the dialog.

## Accessing the dialog state

You can access the state of the dialog by using the useDialog Hook.

```tsx
const { state } = useDialog();
```

_**Notice:** The useDialog Hook only works correcly when the component is wrapped inside the DialogProvider_

## Confirming the dialog

Use the onConfirm function provided by useDialog to confirm (and close) the dialog.

```tsx
const { onConfirm } = useDialog();

const handleSomething = () => {
  onConfirm();
  // or
  onConfirm({ extra: 'data' });
};
```

_**Notice:** The useDialog Hook only works correcly when the component is wrapped inside the DialogProvider_

## Canceling the dialog

Use the onCancel function provided by useDialog to cancel (and close) the dialog.

```tsx
const { onCancel } = useDialog();

const handleSomething = () => {
  onCancel();
  // or
  onCancel({ extra: 'data' });
};
```

_**Notice:** The useDialog Hook only works correcly when the component is wrapped inside the DialogProvider_
