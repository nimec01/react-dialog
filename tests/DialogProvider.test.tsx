import React from 'react';
import { render, screen } from '@testing-library/react';
import { DialogProvider } from '../src';

describe('DialogProvider', () => {
  beforeEach(() => {
    render(
      <DialogProvider>
        <div>Test</div>
      </DialogProvider>,
    );
  });

  it('should render the children', () => {
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
