import React from 'react';
import { Link } from 'react-router-dom';
import styles from './about.module.scss';

interface Profile {
  name: string;
  email: string;
}

interface AboutProps {
  profile: Profile;
}

export function About({ profile }: AboutProps) {
  console.log('about prof', profile);

  if (!profile) {
    return null;
  }

  return (
    <>
      <h1>About</h1>
      <h2>profile</h2>
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
        <a href="https://github.com/jasonnnnnnnnnnnnn/fastly-react-compute-edge" className={styles.someClass}>
          view code
        </a>
      </div>
    </>
  );
}
