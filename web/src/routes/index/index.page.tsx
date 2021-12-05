import React from 'react';
import styles from './index.module.scss';

export function IndexPage() {
  return (
    <>
      <h1>fastly compute@edge react SSR example</h1>
      <p>welcome to the example, click a link to view data fetching in action</p>
      <div>
        <a
          href="https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge/tree/main/web"
          target="_blank"
          rel="noreferrer nofollow"
          className={styles.someClass}
        >
          view code
        </a>
      </div>
    </>
  );
}
