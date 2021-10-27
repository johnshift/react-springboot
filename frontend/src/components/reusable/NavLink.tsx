import { JSX } from 'preact';

type Props = {
  text: string;
  icon: JSX.Element;
  path: string;
  label?: string;
  onClick?: JSX.MouseEventHandler<HTMLAnchorElement>;
};

const NavLink = ({ text, icon, path, label, onClick }: Props) => {
  const pathname = window.location.pathname;
  let className =
    'w-full h-12 px-5 py-4 text-center inline-flex justify-start items-center mr-3 focus:outline-none';

  if (pathname !== path) {
    className += ' inactive';
  } else {
    className += ' active';
  }

  return (
    <a type="button" aria-label={label || text} href={path} class={className} onClick={onClick}>
      {icon}
      <span class="pl-2">{text}</span>
    </a>
  );
};

export default NavLink;
