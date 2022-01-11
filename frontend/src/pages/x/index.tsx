import minLazy from '../../utils/minLazy';
import Button from '../../components/button';
import { Suspense } from 'preact/compat';
import { useNotif } from '../../components/notification/store';

const Notification = minLazy(() => import('../../components/notification'), 0);

const PageX = () => {
  // const { error } = useNotif();
  const { loading } = useNotif();

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <Suspense fallback={null}>
        {/* <Button onClick={() => error('Incorrect username/email or password')}>toggle notif</Button> */}
        <Button onClick={() => loading()}>toggle notif</Button>
        <Notification />
      </Suspense>
    </div>
  );
};

export default PageX;
