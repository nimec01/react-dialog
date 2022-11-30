export interface DialogState {
  id: string;
  content: string | React.ReactNode;
}

export interface DialogOptions {
  closeOnOffsiteClick?: boolean;
  closeOnEscape?: boolean;
  removeDefaultClasses?: boolean;
  wrapperClassName?: string;
  cardClassName?: string;
  cardBodyClassName?: string;
  cardActionsClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
  confirmButtonLabel?: string;
  cancelButtonLabel?: string;
  disableConfirmButton?: boolean;
  disableCancelButton?: boolean;
}

export type Dialog = DialogState & DialogOptions;

export interface Resolve {
  dialogID: string;
  resolve: (value: any) => void;
}

export interface GlobalState {
  dialogs: Dialog[];
  resolves: Resolve[];
}
