import React from 'react';
import { routes } from 'src/routes';
import { generatePath, Link as ReactRouterLink, Params } from 'react-router-dom';

interface LinkProps {
  to: typeof routes[number]['path'];
  params?: Params;
  children: React.ReactNode;
}
export function Link({ to, params, children }: LinkProps) {
  const path = generatePath(to, params);

  return (
    <ReactRouterLink to={path} reloadDocument>
      {children}
    </ReactRouterLink>
  );
}
