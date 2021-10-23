import PageCenter from '../../components/PageCenter';
import NavLink from '../../components/reusable/NavLink';
import HomeSvg from '../../components/svg/HomeSvg';

const IndexPage = () => {
  return (
    <PageCenter>
      <NavLink text="Home" icon={<HomeSvg />} path="/" />
    </PageCenter>
  );
};

export default IndexPage;
