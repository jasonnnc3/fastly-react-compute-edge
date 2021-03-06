import React, { useEffect, useState } from 'react';
import styles from 'src/routes/client-side-fetch/client-side-data-fetch.module.scss';

function wait(seconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

async function fetcher(pathname: string) {
  await wait(2);
  return { pathname, some: 'data that took forever to load', more: 'keys', and: 'values' };
}

export function ClientSideFetchPage() {
  const [data, setData] = useState<ReturnType<typeof fetcher> | null>(null);

  useEffect(() => {
    const fillBar = document.getElementsByClassName(styles.progressFill)[0];

    requestAnimationFrame(() => {
      (fillBar as HTMLDivElement).style.width = `100%`;
    });
  }, []);

  useEffect(() => {
    void (async function fetchClientSide() {
      const res = await fetcher('/client-side-fetch-example');
      // @ts-expect-error
      setData(res);
    })();
  }, []);

  return (
    <>
      <h1>SSR + client side data fetch example</h1>
      <p>
        example of SSR + client side data fetching to handle non-performant endpoints. initial HTML is rendered almost
        immediately from the compute@edge network, upon initial render, data is fetched from the client.
      </p>
      {renderData()}
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

  function renderData() {
    if (data) {
      return (
        <pre data-testid="codeblock" className={styles.pre}>
          {JSON.stringify(data, null, 2)}
        </pre>
      );
    }

    return (
      <div className={styles.progressBar}>
        <div className={styles.progressFill} />
      </div>
    );
  }
}
