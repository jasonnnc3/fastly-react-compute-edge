import React from 'react';
import { Link } from 'react-router-dom';
import styles from './about.module.scss';

export function About() {
  return (
    <>
      <div>About</div>
      <Link to="/">to home</Link>
      <div>
        <a href="https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge" className={styles.someClass}>
          view code
        </a>
      </div>
    </>
  );
}
