import React from 'react';

export enum DialogVisibility {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
}

export interface DialogState {
  visibility: DialogVisibility;
  title: string;
}

export const initialState: DialogState = {
  visibility: DialogVisibility.HIDDEN,
  title: '',
};

export enum DialogActionType {
  OPEN_DIALOAG = 'OPEN_DIALOG',
  CLOSE_DIALOG = 'CLOSE_DIALOG',
}

export interface DialogAction {
  type: DialogActionType;
  payload?: any;
}

export const reducer = (state: DialogState, action: DialogAction): DialogState => {
  switch (action.type) {
    case DialogActionType.OPEN_DIALOAG:
      return {
        ...state,
        visibility: DialogVisibility.VISIBLE,
        title: action.payload.title,
      };
    case DialogActionType.CLOSE_DIALOG:
      return {
        ...state,
        visibility: DialogVisibility.HIDDEN,
        title: '',
      };
    default:
      return state;
  }
};
