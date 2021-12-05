import { fetchFastlyBackend } from 'fastly';
import React from 'react';
import { Post } from 'src/app';
import { Link } from 'src/components/link/link';
import styles from 'src/routes/profile/profile.module.scss';

interface PostsProps {
  posts: Post[];
}

PostsPage.fetchSSRProps = async () => {
  const posts = await fetchFastlyBackend<Post[]>('web_api', '/api/posts');

  return {
    posts,
  };
};

export function PostsPage({ posts }: PostsProps) {
  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map(({ title, content, id }) => (
          <>
            <h2>{title}</h2>
            <Link to="/posts/:id" params={{ id }}>
              view post page for {id}
            </Link>
            <p>{content}</p>
          </>
        ))}
      </ul>
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
