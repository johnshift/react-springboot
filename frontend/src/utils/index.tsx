import { h, JSX } from "preact";
import { Suspense } from "preact/compat";
import DelayedFallback from "../components/fallback/DelayedFallback";

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
) => {
  if (typeof window !== "undefined") {
    return (
      <Suspense
        fallback={
          <DelayedFallback>{fallback || preRenderLoader}</DelayedFallback>
        }
      >
        {lazyComponent}
      </Suspense>
    );
  }

  return preRenderLoader;
};
