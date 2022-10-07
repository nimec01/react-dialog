import React, { useCallback } from 'react';
import { useDialog } from '../src';

export default function App() {
  const { openDialog } = useDialog();

  const handleClick = useCallback(async () => {
    const result = await openDialog('Are you sure?');

    console.log(result);
  }, [openDialog]);

  return (
    <button className="btn" onClick={handleClick}>
      Open dialog
    </button>
  );
}
