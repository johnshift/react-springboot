import { h } from 'preact';
import { BACKEND_API_URL } from '../../constants';

const PageX = () => {
  console.log('backend: ', BACKEND_API_URL);
  return (
    <>
      <p>env: {BACKEND_API_URL}</p>
    </>
  );
};

export default PageX;
