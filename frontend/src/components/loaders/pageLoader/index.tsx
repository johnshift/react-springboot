interface Props {
  text?: string;
}

const PageLoader = ({ text = 'loading ...' }: Props) => {
  return (
    <div id="pgld">
      {/* replace this as logo / spinner */}
      <h1>{text}</h1>
    </div>
  );
};

export default PageLoader;
