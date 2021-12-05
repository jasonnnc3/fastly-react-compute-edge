import { fetchFastlyBackend, FetchSSRPropsParams } from 'fastly';
import React from 'react';
import { Post } from 'src/app';
import styles from 'src/routes/profile/profile.module.scss';

interface PostProps {
  post: Post;
}

PostPage.fetchSSRProps = async ({ params }: FetchSSRPropsParams) => {
  const post = await fetchFastlyBackend<Post>('web_api', `/api/posts/${params.id}`);

  return {
    post,
  };
};

export function PostPage({ post: { title, content } }: PostProps) {
  return (
    <>
      <h1>{title}</h1>
      <p>{content}</p>
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
