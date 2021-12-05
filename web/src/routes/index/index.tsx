import React from 'react';
import styles from './index.module.scss';

Index.fetchProps = () => {
  console.log('fetching everything');
};

export function Index(props: Record<any, any>) {
  console.log(props);
  return null;

  return (
    <>
      <h1>fastly compute@edge react SSR example</h1>
      <p>welcome to the example, click a link to view data fetching in action. add some docs stuff in mdx maybe</p>
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
    </>
  );
}
