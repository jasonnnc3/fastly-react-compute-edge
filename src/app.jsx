import 'regenerator-runtime/runtime.js';
import React from 'react';

export function App(props) {
  return (
    <>
      <div>these are some props</div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </>
  );
}
