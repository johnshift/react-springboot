import { ComponentChildren, JSX } from 'preact';

type Props = {
  children: ComponentChildren;
};

const Center = ({ children }: Props): JSX.Element => (
  <div class="flex h-full justify-center items-center">{children}</div>
);

export default Center;
