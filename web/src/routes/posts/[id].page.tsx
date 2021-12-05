import { fetchFastlyBackend } from 'fastly';
import React from 'react';
import { Post } from 'src/app';
import styles from 'src/routes/profile/profile.module.scss';

// TODO: fix fetchSSRProps type inference
PostPage.fetchSSRProps = async ({ params }: { params: { id: string } }) => {
  const post = await fetchFastlyBackend<Post>('web_api', `/posts/${params.id}`);

  return {
    post,
  };
};

interface PostProps {
  post: Post;
}

export function PostPage({ post: { title, content } }: PostProps) {
  console.log(title, content);
  return (
    <>
      <h1>{title}</h1>
      <p>{content}</p>
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
