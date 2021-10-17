import { ComponentChildren, JSX } from 'preact';

type Props = {
  children: ComponentChildren;
};

const PageCenter = ({ children }: Props): JSX.Element => (
  <div class="flex container mx-auto h-screen justify-center items-center">{children}</div>
);

export default PageCenter;
