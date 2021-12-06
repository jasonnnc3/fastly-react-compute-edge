import React from 'react';
import { Link } from 'src/components/link/link';
import styles from 'src/routes/not-found/not-found.module.scss';

export function NotFoundPage() {
  return (
    <div className={styles.someClass}>
      <div>not found</div>
      <Link to="/">go to home</Link>
      <div>
        <a
          href="https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge"
          target="_blank"
          rel="noreferrer nofollow"
          className={styles.someClass}
        >
          view code
        </a>
      </div>
    </div>
  );
}
