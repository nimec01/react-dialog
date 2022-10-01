/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DialogComponent, DialogProvider } from '../src';
import TestDialog from './TestDialog';

describe('DialogComponent without existing portal element', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('it should throw an error on render', () => {
    expect(() => {
      render(<DialogComponent />);
    }).toThrowError('Target container is not a DOM element.');
  });
});

describe('DialogComponent with existing portal element', () => {
  describe('before opening', () => {
    beforeEach(() => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(<DialogComponent />, {
        container: document.body.appendChild(portalElement),
      });
    });

    it('should have no children', () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.dialog__wrapper')).toBeNull();
    });
  });

  describe('after opening', () => {
    beforeEach(async () => {
      const portalElement = document.createElement('div');
      portalElement.setAttribute('id', 'dialog');
      portalElement.setAttribute('data-testid', 'dialog');

      render(
        <DialogProvider>
          <TestDialog />
          <DialogComponent />
        </DialogProvider>,
        {
          container: document.body.appendChild(portalElement),
        },
      );

      await userEvent.click(screen.getByText('Open dialog'));
    });

    it('should show the dialog', async () => {
      const dialog = screen.getByTestId('dialog');

      expect(dialog.querySelector('.dialog__wrapper')).not.toBeNull();
      expect(screen.queryAllByText('Wanna confirm?')).toHaveLength(1);
    });

    it('should close the dialog on confirm', async () => {
      const dialog = screen.getByTestId('dialog');
      await userEvent.click(screen.getByText('Yes'));

      expect(dialog.querySelector('.dialog__wrapper')).toBeNull();
      expect(screen.queryAllByText('Wanna confirm?')).toHaveLength(0);
    });

    it('should close the dialog on cancel', async () => {
      const dialog = screen.getByTestId('dialog');
      await userEvent.click(screen.getByText('No'));

      expect(dialog.querySelector('.dialog__wrapper')).toBeNull();
      expect(screen.queryAllByText('Wanna confirm?')).toHaveLength(0);
    });

    it('should close the dialog on background click', async () => {
      const dialog = screen.getByTestId('dialog');
      const dialog_wrapper = dialog.querySelector('.dialog__wrapper');
      await userEvent.click(dialog_wrapper as HTMLElement);

      expect(dialog.querySelector('.dialog__wrapper')).toBeNull();
      expect(screen.queryAllByText('Wanna confirm?')).toHaveLength(0);
    });

    it('should close the dialog on pressing Escape', async () => {
      const dialog = screen.getByTestId('dialog');
      await userEvent.keyboard('{Escape}');

      expect(dialog.querySelector('.dialog__wrapper')).toBeNull();
      expect(screen.queryAllByText('Wanna confirm?')).toHaveLength(0);
    });

    // TODO: add test to check correct response
    // This is currently not possible, since jsdom does not support the submitter property of the submit event
    // Tests can be added once this is fixed: https://github.com/jsdom/jsdom/issues/3117
    // However, this is not a problem in the browser, since the submitter property is supported (and tested) there
  });
});
