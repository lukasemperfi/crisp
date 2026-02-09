import { generate } from "critical";
import { glob } from "glob";
import { resolve, relative } from "path";

const generateCriticalCss = async () => {
  const dist = resolve("dist");

  try {
    const files = glob.sync(`${dist}/**/index.html`);

    const cssFiles = glob.sync(`${dist}/assets/*.css`);
    console.log("CSS files found:", cssFiles);

    for (const file of files) {
      const relativePath = relative(dist, file).replace(/\\/g, "/");
      console.log(`Generating critical CSS for: ${relativePath}`);

      await generate({
        base: dist,
        src: relativePath,
        target: relativePath,
        inline: true,
        css: cssFiles,
        dimensions: [
          { width: 320, height: 667 },
          { width: 1920, height: 1080 },
        ],
        extract: false,
      });

      console.log(`✅ Critical CSS generated for: ${relativePath}`);
    }
  } catch (error) {
    console.error("Error generating critical CSS:", error);
  }
};

// generateCriticalCss();
