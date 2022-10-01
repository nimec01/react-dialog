import React, { useContext } from 'react';
import DialogContext, { IDialogContext } from './DialogContext';
import { DialogActionType } from './DialogReducer';

interface DialogResult {
  confirmed: boolean;
  value?: any;
}

let resolveCallback: (flag: any) => void;
export function useDialog() {
  const { state, dispatch } = useContext<IDialogContext>(DialogContext);

  const openDialog = (title: string): Promise<DialogResult> => {
    if (typeof dispatch === 'undefined') throw new Error('DialogContext is not provided');
    dispatch({
      type: DialogActionType.OPEN_DIALOAG,
      payload: { title },
    });
    return new Promise(resolve => {
      resolveCallback = resolve;
    });
  };

  const closeDialog = () => {
    if (typeof dispatch === 'undefined') throw new Error('DialogContext is not provided');
    dispatch({
      type: DialogActionType.CLOSE_DIALOG,
    });
  };

  const onConfirm = (props?: any) => {
    closeDialog();
    resolveCallback({
      confirmed: true,
      value: props,
    });
  };

  const onCancel = (props?: any) => {
    closeDialog();
    resolveCallback({
      confirmed: false,
      value: props,
    });
  };

  return { openDialog, onConfirm, onCancel, state };
}
