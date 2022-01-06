import { h, JSX } from "preact";
import { Suspense } from "preact/compat";
import DelayedFallback from "../components/fallback/DelayedFallback";

/**
 * Executes function if in browser
 * @param fn function to execute
 */
export const prerenderExecWrapper = (fn: Function) => {
  if (typeof window !== "undefined") {
    fn();
  }
};

/**
 * Wraps returned object into conditional check if on browser
 * @param returnToBrowser returned object if in browser
 * @param returnToPrerender returned object if prerender
 * @returns
 */
export const prerenderReturnWrapper = <T,>(
  returnToBrowser: T,
  returnToPrerender: T
): T => {
  if (typeof window !== "undefined") {
    return returnToBrowser;
  }

  return returnToPrerender;
};

/**
 * Preact-cli does not allow prerender on suspense components.
 * This wraps it on window check if statement.
 * @param lazyComponent component wrapped in lazy call
 * @param preRenderLoader loader for pre rendered html
 * @param fallback loader for suspense component
 * @returns
 */
export const prerenderSuspense = (
  lazyComponent: JSX.Element,
  preRenderLoader: JSX.Element,
  fallback?: JSX.Element
): JSX.Element => {
  return prerenderReturnWrapper(
    <Suspense
      fallback={
        <DelayedFallback>{fallback || preRenderLoader}</DelayedFallback>
      }
    >
      {lazyComponent}
    </Suspense>,
    <DelayedFallback>{preRenderLoader}</DelayedFallback>
  );
};
