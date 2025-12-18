import "dotenv/config";
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import { glob } from "glob";
import nunjucks from "vite-plugin-nunjucks";
import FullReload from "vite-plugin-full-reload";

const pagesDir = resolve(__dirname, "src/pages");
const outDir = "../../dist";

function getHtmlEntries() {
  const entries = {};
  const files = glob.sync(`${pagesDir}/**/index.html`);

  for (const file of files) {
    const relative = file.replace(pagesDir, "").replace(/\\/g, "/");
    let name = relative.replace("/index.html", "");

    if (name === "") {
      name = "home";
    }
    entries[name] = file;
  }

  const file404 = glob.sync(`${pagesDir}/404.html`)[0];
  const relative404 = file404.replace(pagesDir, "").replace(/\\/g, "/");
  let name404 = relative404.replace(".html", "");

  if (file404) {
    entries[name404] = file404;
  }

  return entries;
}

export default defineConfig(({ mode }) => {
  const baseUrl = mode === "production" ? "/nuts/" : "/";
  // const baseUrl = "/";

  return {
    base: baseUrl,
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    root: pagesDir,
    publicDir: resolve(__dirname, "src/shared/assets"),
    build: {
      outDir: outDir,
      emptyOutDir: true,
      rollupOptions: {
        input: getHtmlEntries(),
      },
      assetsDir: "assets",
    },
    plugins: [
      nunjucks({ variables: { "*": { baseUrl } } }),

      FullReload(["src/**/*"]),
    ],
  };
});
