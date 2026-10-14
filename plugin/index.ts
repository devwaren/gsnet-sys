
import type { Plugin } from "vite";

type Options = {
  enabled?: boolean;
};

export function disableReactDevTools(
  options: Options = {},
): Plugin {
  const { enabled = true } = options;

  return {
    name: "vite-plugin-disable-react-devtools",
    apply: "build",
    enforce: "pre",

    transformIndexHtml() {
      if (!enabled) return;

      return [
        {
          tag: "script",
          attrs: {},
          children: `
            (() => {
              const noop = () => {};
              const hook = window.__REACT_DEVTOOLS_GLOBAL_HOOK__;

              if (hook) {
                hook.inject = noop;
                hook.on = noop;
                hook.off = noop;
                hook.emit = noop;
                hook.sub = noop;
              } else {
                Object.defineProperty(
                  window,
                  "__REACT_DEVTOOLS_GLOBAL_HOOK__",
                  {
                    configurable: false,
                    value: {
                      isDisabled: true,
                      supportsFiber: true,
                      inject: noop,
                      on: noop,
                      off: noop,
                      emit: noop,
                      sub: noop,
                    },
                  },
                );
              }
            })();
          `,
          injectTo: "head-prepend",
        },
      ];
    },
  };
}
