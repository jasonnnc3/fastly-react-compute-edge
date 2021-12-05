import { fetchFastlyBackend } from 'fastly';
import React from 'react';
import { Post } from 'src/app';
import styles from 'src/routes/profile/profile.module.scss';

PostPage.fetchSSRProps = async (pathname: string) => {
  // figure out better way to get path params
  console.log('1 - getting post for id');
  console.log(pathname);
  const id = pathname.split('/').slice(-1)[0];
  console.log('1 - this is id');
  console.log(id);
  const post = await fetchFastlyBackend<Post>('web_api', `/posts/${id}`);

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
