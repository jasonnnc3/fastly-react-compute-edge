import React from 'react';
import { Link } from 'react-router-dom';
import { Profile } from 'src/app';
import styles from 'src/routes/profile/profile.module.scss';

interface ProfileProps {
  profile: Profile;
}

ProfilePage.fetchProps = () => {
  console.log('hello im fetching profile');
};

export function ProfilePage(props: ProfileProps) {
  console.log(props);
  return null;
  const profile = {};
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
      <Link to="/" reloadDocument>
        to home
      </Link>
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
