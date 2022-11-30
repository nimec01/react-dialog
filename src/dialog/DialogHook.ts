import React, { ReactNode, useContext } from 'react';
import { DialogOptions } from '../types';
import DialogContext, { IDialogContext } from './DialogContext';
import { DialogActionType } from './DialogReducer';

interface DialogResult {
  confirmed: boolean;
  value?: any;
}

export function useDialog() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const { state, dispatch = () => {} } = useContext<IDialogContext>(DialogContext);

  const openDialog = (
    content: ReactNode | string,
    options?: DialogOptions,
    callback?: (result: any) => any,
  ): Promise<DialogResult> | undefined => {
    const id = Math.random()
      .toString(16)
      .substring(2, 8 + 2);

    dispatch({
      type: DialogActionType.OPEN_DIALOG,
      dialog: {
        id,
        content,
        ...options,
      },
    });

    if (callback) {
      dispatch({
        type: DialogActionType.ADD_CALLBACK,
        dialogId: id,
        resolve: callback,
      });
      return;
    }

    return new Promise(resolve => {
      dispatch({
        type: DialogActionType.ADD_CALLBACK,
        dialogId: id,
        resolve,
      });
    });
  };

  const closeDialog = (dialogId?: string) => {
    dispatch({
      type: DialogActionType.CLOSE_DIALOG,
      dialogId,
    });
  };

  const onConfirm = (props?: any, dialogId?: string) => {
    closeDialog(dialogId);
    const resolveCallback = state.resolves.find(resolve => resolve.dialogID === dialogId)?.resolve;
    if (!resolveCallback) return;
    resolveCallback({
      confirmed: true,
      value: props,
    });
  };

  const onCancel = (props?: any, dialogId?: string) => {
    closeDialog(dialogId);
    const resolveCallback = state.resolves.find(resolve => resolve.dialogID === dialogId)?.resolve;
    if (!resolveCallback) return;
    resolveCallback({
      confirmed: false,
      value: props,
    });
  };

  return { openDialog, onConfirm, onCancel, state };
}
