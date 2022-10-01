import { renderHook } from '@testing-library/react';
import { useDialog } from '../src';

describe('DialogHook', () => {
  it('should have all properties', () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current).toBeDefined();
    expect(result.current).toHaveProperty('openDialog');
    expect(result.current).toHaveProperty('onConfirm');
    expect(result.current).toHaveProperty('onCancel');
    expect(result.current).toHaveProperty('state');
    expect(result.current.openDialog).toBeInstanceOf(Function);
    expect(result.current.onConfirm).toBeInstanceOf(Function);
    expect(result.current.onCancel).toBeInstanceOf(Function);
    expect(result.current.state).toBeInstanceOf(Object);
  });
});
