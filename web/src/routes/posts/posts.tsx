import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from 'src/app';
import styles from 'src/routes/profile/profile.module.scss';

interface PostsProps {
  posts: Post[];
}

Posts.fetchProps = () => {
  console.log('hello im fetching posts');
};

export function Posts(props: PostsProps) {
  console.log(props);
  return null;
  const posts = [];
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map(({ title, content, id }) => (
          <>
            <h2>{title}</h2>
            <Link to={`/posts/${id}`} reloadDocument>
              view post page for {id}
            </Link>
            <p>{content}</p>
          </>
        ))}
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
