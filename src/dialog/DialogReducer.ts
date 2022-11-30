import React from 'react';
import { Dialog, GlobalState } from '../types';

export const initialState: GlobalState = {
  dialogs: [],
  resolves: [],
};

export enum DialogActionType {
  OPEN_DIALOG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',
  ADD_CALLBACK = 'ADD_CALLBACK',
}

export interface DialogAction {
  type: DialogActionType;
  dialog?: Dialog;
  dialogId?: string;
  resolve?: (value: any) => void;
}

export const reducer = (state: GlobalState, action: DialogAction): GlobalState => {
  switch (action.type) {
    case DialogActionType.OPEN_DIALOG:
      if (!action.dialog) return state;
      return {
        dialogs: [...state.dialogs, action.dialog],
        resolves: state.resolves,
      };
    case DialogActionType.CLOSE_DIALOG:
      return {
        dialogs: state.dialogs.filter(dialog => dialog.id !== action.dialogId),
        resolves: state.resolves.filter(resolve => resolve.dialogID !== action.dialogId),
      };
    case DialogActionType.ADD_CALLBACK:
      if (!action.resolve) return state;
      if (!action.dialogId) return state;
      return {
        dialogs: state.dialogs,
        resolves: [...state.resolves, { dialogID: action.dialogId, resolve: action.resolve }],
      };
    default:
      return state;
  }
};
