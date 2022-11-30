import React, { createContext, Dispatch } from 'react';
import { GlobalState } from '../types';
import { DialogAction, initialState } from './DialogReducer';

export interface IDialogContext {
  state: GlobalState;
  dispatch?: Dispatch<DialogAction>;
}

export default createContext<IDialogContext>({
  state: initialState,
});
