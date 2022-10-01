import React, { useState } from 'react';
import { useDialog } from '../src';

function TestDialog() {
  const { openDialog } = useDialog();
  const [res, setRes] = useState('{}');

  const handleClick = async () => {
    const result = await openDialog('Wanna confirm?');
    setRes(JSON.stringify(result));
  };

  return (
    <div>
      <button onClick={handleClick}>Open dialog</button>
      <div data-testid="dialog-result">{res}</div>
    </div>
  );
}

export default TestDialog;
