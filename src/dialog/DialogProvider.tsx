import React, { ReactNode, useReducer } from 'react';
import DialogContext from './DialogContext';
import { initialState, reducer } from './DialogReducer';

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <DialogContext.Provider value={{ state, dispatch }}>{children}</DialogContext.Provider>;
}
