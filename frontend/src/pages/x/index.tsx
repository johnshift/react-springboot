import LoginForm from '../../features/login/LoginForm';

const PageX = () => {
  const close = () => null;

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
      <LoginForm onClose={close} />
    </div>
  );
};

export default PageX;
