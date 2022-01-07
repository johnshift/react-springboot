import * as styles from './pageLoader.css';

interface Props {
  text?: string;
}

const PageLoader = ({ text = 'loading ...' }: Props) => {
  return (
    <div class={styles.wrapper}>
      {/* replace this as logo / spinner */}
      <h1>{text}</h1>
    </div>
  );
};

export default PageLoader;
