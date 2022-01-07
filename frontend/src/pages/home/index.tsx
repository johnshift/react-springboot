import { Link } from 'preact-router';
import * as styles from './home.css';

const Page = () => (
  <div>
    <h1 class={styles.title}>Home Page</h1>
    <p>home page</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <Link href="/profile">PROFILE</Link>
  </div>
);

export default Page;
