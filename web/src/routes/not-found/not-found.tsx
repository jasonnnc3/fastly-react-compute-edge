import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'src/routes/not-found/not-found.module.scss';

export function NotFound() {
  return (
    <div className={styles.someClass}>
      <div>not found</div>
      <Link to="/" reloadDocument>
        to home
      </Link>
      <div>
        <a href="https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge">view code</a>
      </div>
    </div>
  );
}
