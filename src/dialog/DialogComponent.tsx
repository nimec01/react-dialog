import React, { FormEvent, MouseEvent, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { useDialog } from './DialogHook';
import { DialogVisibility } from './DialogReducer';

interface DialogComponentProps {
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

export function DialogComponent({
  closeOnOffsiteClick = true,
  closeOnEscape = true,
  removeDefaultClasses = false,
  wrapperClassName,
  cardClassName,
  cardBodyClassName,
  cardActionsClassName,
  confirmButtonClassName,
  cancelButtonClassName,
  confirmButtonLabel = 'Yes',
  cancelButtonLabel = 'No',
  disableConfirmButton = false,
  disableCancelButton = false,
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
        onCancel(data);
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
    <div
      className={clsx(!removeDefaultClasses && 'dialog__wrapper', wrapperClassName)}
      onClick={closeOnOffsiteClick ? onOffsiteClick : undefined}
    >
      <div className={clsx(!removeDefaultClasses && 'dialog__card', cardClassName)}>
        <form onSubmit={onSubmit}>
          {state.content && (
            <div className={clsx(!removeDefaultClasses && 'dialog__card__body', cardBodyClassName)}>
              {state.content}
            </div>
          )}
          <div
            className={clsx(!removeDefaultClasses && 'dialog__card__actions', cardActionsClassName)}
          >
            {!disableConfirmButton && (
              <button
                className={clsx(
                  !removeDefaultClasses && 'dialog__button dialog__success',
                  confirmButtonClassName,
                )}
                data-dialog-action="resolve"
              >
                {confirmButtonLabel}
              </button>
            )}
            {!disableCancelButton && (
              <button
                className={clsx(
                  !removeDefaultClasses && 'dialog__button dialog__error',
                  cancelButtonClassName,
                )}
                data-dialog-action="reject"
              >
                {cancelButtonLabel}
              </button>
            )}
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
