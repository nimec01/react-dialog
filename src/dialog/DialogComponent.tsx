import React, { FormEvent, MouseEvent, useCallback, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';

import { useDialog } from './DialogHook';
import { DialogOptions } from '../types';

export function DialogComponent(componentOptions: DialogOptions) {
  const { onConfirm, onCancel, state } = useDialog();

  const dialog = useMemo(() => {
    return state.dialogs.at(-1);
  }, [state]);

  const options = useMemo<DialogOptions>(() => {
    return {
      closeOnOffsiteClick:
        dialog?.closeOnOffsiteClick ?? componentOptions.closeOnOffsiteClick ?? true,
      closeOnEscape: dialog?.closeOnEscape ?? componentOptions.closeOnEscape ?? true,
      removeDefaultClasses:
        dialog?.removeDefaultClasses ?? componentOptions.removeDefaultClasses ?? false,
      wrapperClassName: dialog?.wrapperClassName ?? componentOptions.wrapperClassName ?? '',
      cardClassName: dialog?.cardClassName ?? componentOptions.cardClassName ?? '',
      cardBodyClassName: dialog?.cardBodyClassName ?? componentOptions.cardBodyClassName ?? '',
      cardActionsClassName:
        dialog?.cardActionsClassName ?? componentOptions.cardActionsClassName ?? '',
      confirmButtonClassName:
        dialog?.confirmButtonClassName ?? componentOptions.confirmButtonClassName ?? '',
      cancelButtonClassName:
        dialog?.cancelButtonClassName ?? componentOptions.cancelButtonClassName ?? '',
      confirmButtonLabel:
        dialog?.confirmButtonLabel ?? componentOptions.confirmButtonLabel ?? 'Yes',
      cancelButtonLabel: dialog?.cancelButtonLabel ?? componentOptions.cancelButtonLabel ?? 'No',
      disableConfirmButton:
        dialog?.disableConfirmButton ?? componentOptions.disableConfirmButton ?? false,
      disableCancelButton:
        dialog?.disableCancelButton ?? componentOptions.disableCancelButton ?? false,
    };
  }, [dialog]);

  const onOffsiteClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.className !== 'dialog__wrapper') return;
      onCancel(undefined, dialog?.id);
    },
    [onCancel],
  );

  const onKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;

      onCancel(undefined, dialog?.id);
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
        onConfirm(data, dialog?.id);
      } else {
        onCancel(data, dialog?.id);
      }
    },
    [onConfirm, onCancel],
  );

  useEffect(() => {
    if (options.closeOnEscape) document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [options.closeOnEscape, onKeyUp]);

  const component = (
    <div
      className={clsx(!options.removeDefaultClasses && 'dialog__wrapper', options.wrapperClassName)}
      onClick={options.closeOnOffsiteClick ? onOffsiteClick : undefined}
    >
      <div className={clsx(!options.removeDefaultClasses && 'dialog__card', options.cardClassName)}>
        <form onSubmit={onSubmit}>
          {dialog?.content && (
            <div
              className={clsx(
                !options.removeDefaultClasses && 'dialog__card__body',
                options.cardBodyClassName,
              )}
            >
              {dialog?.content}
            </div>
          )}
          <div
            className={clsx(
              !options.removeDefaultClasses && 'dialog__card__actions',
              options.cardActionsClassName,
            )}
          >
            {!options.disableConfirmButton && (
              <button
                className={clsx(
                  !options.removeDefaultClasses && 'dialog__button dialog__success',
                  options.confirmButtonClassName,
                )}
                data-dialog-action="resolve"
              >
                {options.confirmButtonLabel}
              </button>
            )}
            {!options.disableCancelButton && (
              <button
                className={clsx(
                  !options.removeDefaultClasses && 'dialog__button dialog__error',
                  options.cancelButtonClassName,
                )}
                data-dialog-action="reject"
              >
                {options.cancelButtonLabel}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );

  return createPortal(
    state.dialogs.length > 0 ? component : null,
    document.getElementById('dialog') as HTMLElement,
  );
}
