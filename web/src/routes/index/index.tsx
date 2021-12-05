import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.scss';

interface Post {
  id: number;
  title: string;
}

interface IndexProps {
  posts: Post[];
}

export function Index({ posts }: IndexProps) {
  console.log('index posts', posts);

  if (!posts) {
    return null;
  }

  return (
    <>
      <h1>Home</h1>
      <h2>posts</h2>
      <ul>
        {posts.map((post) => (
          <>
            <li>{post.id}</li>
            <li>{post.title}</li>
          </>
        ))}
      </ul>
      <Link to="/about" reloadDocument>
        to about
      </Link>
      <div>
        <a href="https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge" className={styles.someClass}>
          view code
        </a>
      </div>
    </>
  );
}
