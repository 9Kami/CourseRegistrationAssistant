/**
 * title: Course Registration Assistant
 * Routes:
 *   - ./src/pages/SignUp.js
 *   - ./src/pages/Login.js
 *   - ./src/pages/Dashboard.js
 */
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>xTo get started, edit <code>src/pages/index.js</code> and save to reload.</li>
        <li>
          <a href="https://umijs.org/guide/getting-started.html">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}
