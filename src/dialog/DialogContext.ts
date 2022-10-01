import React, { createContext, Dispatch } from 'react';
import { DialogState, initialState } from './DialogReducer';

export interface IDialogContext {
  state: DialogState;
  dispatch?: Dispatch<any>;
}

export default createContext<IDialogContext>({
  state: initialState,
});
