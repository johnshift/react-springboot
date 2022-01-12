import { h } from 'preact';
import DelayedFallback from '../delayedFallback';
const PageLoader = () => {
  return (
    <DelayedFallback delay={300}>
      <div id="pgld">
        <div />
      </div>
    </DelayedFallback>
  );
};

export default PageLoader;
