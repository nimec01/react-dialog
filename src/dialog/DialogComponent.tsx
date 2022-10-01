import React, { FormEvent, MouseEvent, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import { useDialog } from './DialogHook';
import { DialogVisibility } from './DialogReducer';

interface DialogComponentProps {
  closeOnOffsiteClick?: boolean;
  closeOnEscape?: boolean;
}

export function DialogComponent({
  closeOnOffsiteClick = true,
  closeOnEscape = true,
}: DialogComponentProps) {
  const { onConfirm, onCancel, state } = useDialog();

  const onOffsiteClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.className !== 'dialog__wrapper') return;

      onCancel();
    },
    [onCancel],
  );

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      onCancel();
    },
    [onCancel],
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const nativeEvent = e.nativeEvent as SubmitEvent;
      const submitter = nativeEvent.submitter as HTMLElement;

      const data: { [key: string]: any } = {};
      new FormData(e.target as HTMLFormElement).forEach((value, key) => {
        data[key] = value;
      });

      if (submitter?.dataset?.dialogAction === 'resolve') {
        onConfirm(data);
      } else {
        onCancel();
      }
    },
    [onConfirm, onCancel],
  );

  useEffect(() => {
    if (closeOnEscape) document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [closeOnEscape, onKeyUp]);

  const component = (
    <div className="dialog__wrapper" onClick={closeOnOffsiteClick ? onOffsiteClick : undefined}>
      <div className="dialog__card">
        <form onSubmit={onSubmit}>
          {state.title && <div className="dialog__card__body">{state.title}</div>}
          <input type="text" name="testKey" value={'123'} readOnly />
          <div className="dialog__card__actions">
            <button className="dialog__button dialog__success" data-dialog-action="resolve">
              Yes
            </button>
            <button className="dialog__button dialog__error" data-dialog-action="reject">
              No
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(
    state.visibility === DialogVisibility.VISIBLE ? component : null,
    document.getElementById('dialog') as HTMLElement,
  );
}
