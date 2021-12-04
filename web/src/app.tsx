import React from 'react';
import { Routes } from 'react-router';
import { Route } from 'react-router-dom';
import { About } from 'src/routes/about/about';
import { Index } from 'src/routes/index';
import { NotFound } from 'src/routes/not-found/not-found';

export function App() {
  return (
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Index />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}
