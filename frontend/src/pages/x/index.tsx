import { useState } from 'preact/hooks';
import Button from '../../components/button';
import LoginForm, { Skeleton } from '../../features/login/LoginForm';

const PageX = () => {
  const [show, setShow] = useState(false);

  const close = () => null;

  let x = setTimeout(() => {
    setShow(true);
  }, 3000);

  return (
    <>
      <div style={{ display: 'fixed', top: 0, left: 0 }}>
        <Button
          onClick={() => {
            clearTimeout(x);
            setShow(!setShow);

            x = setTimeout(() => {
              setShow(true);
            }, 1000);
          }}
        >
          toggle
        </Button>
      </div>
      <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
        {show ? <LoginForm onClose={close} /> : <Skeleton />}
      </div>
    </>
  );
};

export default PageX;
