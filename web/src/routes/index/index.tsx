import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

export function Index() {
  return (
    <>
      <div>Home</div>
      <Link to="/about">to about</Link>
      <div>
        <a href="https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge" className={styles.someClass}>
          view code
        </a>
      </div>
    </>
  );
}
