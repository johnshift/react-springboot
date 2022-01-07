import { Link } from 'wouter-preact';
import * as styles from './home.css';

const Page = () => (
  <div>
    <h1 class={styles.title}>Home Page</h1>
    <p>home page</p>
    <br />
    <br />
    <br />
    <Link href="/profile">PROFILE</Link>
    <br />
    <br />
    <br />
  </div>
);

export default Page;
