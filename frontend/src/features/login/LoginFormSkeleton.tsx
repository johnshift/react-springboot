import * as styles from './login.css';
import { inputSkeleton } from '../../components/input/input.css';
const LoginFormSkeleton = () => {
  return (
    <div class={styles.wrapper}>
      <h1>veils</h1>
      <form>
        <div class={inputSkeleton} />

        <div class={inputSkeleton} />

        <div class={styles.actionW}>
          <div class={styles.skeletonLink} />
          <div class={styles.skeletonLoginButton} />
        </div>
      </form>
    </div>
  );
};

export default LoginFormSkeleton;
