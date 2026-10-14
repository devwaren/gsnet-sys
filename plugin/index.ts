
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

    transform(code, id) {
      if (!enabled || !id.includes("node_modules/react-dom/")) {
        return;
      }

      return {
        code,
        map: null,
      };
    },
  };
}
