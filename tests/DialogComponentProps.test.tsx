import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DialogComponent, DialogProvider } from '../src';
import TestDialog from './TestDialog';

describe('DialogComponent Props', () => {
  describe('Prop closeOnOffsiteClick={false}', () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent closeOnOffsiteClick={false} />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });
    it('should not close the dialog on background click', async () => {
      const dialog = screen.getByTestId('dialog');

      await userEvent.click(dialog.querySelector('.dialog__wrapper') as HTMLElement);

      expect(dialog.querySelector('.dialog__wrapper')).not.toBeNull();
      expect(screen.queryAllByText('Wanna confirm?')).toHaveLength(1);
    });
  });

  describe('Prop closeOnEscape={false}', () => {
    it('should not close the dialog on pressing Escape', async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent closeOnEscape={false} />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));

      const dialog = screen.getByTestId('dialog');

      await userEvent.keyboard('{Escape}');

      expect(dialog.querySelector('.dialog__wrapper')).not.toBeNull();
      expect(screen.queryAllByText('Wanna confirm?')).toHaveLength(1);
    });
  });

  describe('Prop removeDefaultClasses={true}', () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent removeDefaultClasses={true} />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });

    it('should not find default classes', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.dialog__wrapper')).toBeNull();
      expect(dialog.querySelector('.dialog__card')).toBeNull();
      expect(dialog.querySelector('.dialog__card__body')).toBeNull();
      expect(dialog.querySelector('.dialog__card__actions')).toBeNull();
      expect(dialog.querySelector('.dialog__button')).toBeNull();
      expect(dialog.querySelector('.dialog__success')).toBeNull();
      expect(dialog.querySelector('.dialog__error')).toBeNull();
    });
  });

  describe('Class Props', () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent
            wrapperClassName="custom-wrapper"
            cardClassName="custom-card"
            cardBodyClassName="custom-card-body"
            cardActionsClassName="custom-card-actions"
            confirmButtonClassName="custom-confirm-button"
            cancelButtonClassName="custom-cancel-button"
          />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });

    it('should have custom wrapper class', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.custom-wrapper')).not.toBeNull();
    });

    it('should have custom card class', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.custom-card')).not.toBeNull();
    });

    it('should have custom card body class', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.custom-card-body')).not.toBeNull();
    });

    it('should have custom card actions class', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.custom-card-actions')).not.toBeNull();
    });

    it('should have custom confirm button class', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.custom-confirm-button')).not.toBeNull();
    });

    it('should have custom cancel button class', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.custom-cancel-button')).not.toBeNull();
    });
  });

  describe("Prop confirmButtonLabel={'Confirm'}", () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent confirmButtonLabel={'Confirm'} />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });

    it('should display the confirm button with correct label', () => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog.querySelector('.dialog__success')).toBeDefined();
      expect(dialog.querySelector('.dialog__success')?.innerHTML).toEqual('Confirm');
    });
  });

  describe("Prop cancelButtonLabel={'Cancel'}", () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent cancelButtonLabel={'Cancel'} />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });

    it('should display the cancel button with correct label', () => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog.querySelector('.dialog__error')).toBeDefined();
      expect(dialog.querySelector('.dialog__error')?.innerHTML).toEqual('Cancel');
    });
  });

  describe('Prop disableConfirmButton={true}', () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent disableConfirmButton={true} />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });

    it('should not display the confirm button', () => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog.querySelector('.dialog__success')).toBeNull();
    });
  });

  describe('Prop disableCancelButton={true}', () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog dialogProp="Wanna confirm?" />
          <DialogComponent disableCancelButton={true} />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });

    it('should not display the confirm button', () => {
      const dialog = screen.getByTestId('dialog');
      expect(dialog.querySelector('.dialog__error')).toBeNull();
    });
  });
});
