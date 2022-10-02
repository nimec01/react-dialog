import React from 'react';

export enum DialogVisibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export interface DialogState {
  visibility: DialogVisibility;
  content: string | React.ReactNode;
}

export const initialState: DialogState = {
  visibility: DialogVisibility.HIDDEN,
  content: '',
};

export enum DialogActionType {
  OPEN_DIALOAG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',
}

export interface DialogAction {
  type: DialogActionType;
  body?: string | React.ReactNode;
}

export const reducer = (state: DialogState, action: DialogAction): DialogState => {
  switch (action.type) {
    case DialogActionType.OPEN_DIALOAG:
      return {
        ...state,
        visibility: DialogVisibility.VISIBLE,
        content: action.body,
      };
    case DialogActionType.CLOSE_DIALOG:
      return {
        ...state,
        visibility: DialogVisibility.HIDDEN,
        content: '',
      };
    default:
      return state;
  }
};
