import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'src/routes/profile/profile.module.scss';

interface PostProps {
  id: number;
  title: string;
  content: string;
}

Post.fetchProps = () => {
  console.log('hello im fetching a specific post');
};

export function Post(props: PostProps) {
  console.log(props);
  return null;
  const { id, content, title } = { id: 1, content: '', title: '' };
  return (
    <>
      <h1>{title}</h1>
      <ul>
        <>
          <Link to={`/posts/${id}`} reloadDocument>
            view post page for {id}
          </Link>
          <p>{content}</p>
        </>
      </ul>
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
