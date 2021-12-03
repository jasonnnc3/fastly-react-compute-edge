import React from 'react';
import { Routes } from 'react-router';
import { Link, Route } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <div>not found</div>
            <Link to="/">to home</Link>
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <div>Home</div>
            <Link to="/about">to about</Link>
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <div>About</div>
            <Link to="/">to home</Link>
          </>
        }
      />
    </Routes>
  );
}
