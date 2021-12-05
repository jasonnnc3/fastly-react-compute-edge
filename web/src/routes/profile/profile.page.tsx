import { fetchFastlyBackend } from 'fastly';
import React from 'react';
import { Profile } from 'src/app';
import { Link } from 'src/components/link/link';
import styles from 'src/routes/profile/profile.module.scss';

interface ProfileProps {
  profile: Profile;
}

ProfilePage.fetchSSRProps = async () => {
  const profile = await fetchFastlyBackend<Profile>('web_api', '/profile');

  return {
    profile,
  };
};

export function ProfilePage({ profile }: ProfileProps) {
  return (
    <>
      <h1>profile</h1>
      <ul>
        {Object.entries(profile).map(([key, value]) => (
          <li>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
      <Link to="/">to home</Link>
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
