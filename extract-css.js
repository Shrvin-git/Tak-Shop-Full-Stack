const fs = require("fs");
const path = require("path");

const COMPONENT_FILE = "./main.js";
const BIG_CSS_FILE = "./main.css";
const OUTPUT_FILE = "./extracted/ProductCard.css";

function extractClassesFromJsx(content) {
  const classes = new Set();
  let match;

  // className="x y z"
  const simpleRegex = /className\s*=\s*["'`](.*?)["'`]/g;
  while ((match = simpleRegex.exec(content))) {
    match[1]
      .split(/\s+/)
      .filter(Boolean)
      .forEach((c) => classes.add(c));
  }

  // styles.xxx
  const moduleRegex = /styles\.([A-Za-z0-9_-]+)/g;
  while ((match = moduleRegex.exec(content))) {
    classes.add(match[1]);
  }

  // styles["xxx"]
  const moduleBracketRegex = /styles\[['"`]([^"'`]+)['"`]\]/g;
  while ((match = moduleBracketRegex.exec(content))) {
    classes.add(match[1]);
  }

  return Array.from(classes);
}

// ---------------------------------------------------------

function extractCssBlocks(css, classes) {
  css = css.replace(/@import[^;]+;/g, ""); // remove imports

  const result = [];

  let i = 0;
  while (i < css.length) {
    // پیدا کردن نقطه (selector)
    if (css[i] === ".") {
      let selectorStart = i;

      // selector کامل تا قبل از "{"
      while (i < css.length && css[i] !== "{") i++;

      const selector = css.slice(selectorStart, i).trim();

      // چک کن selector در لیست کلاس‌ها هست یا نه
      let isMatch = false;
      for (const cls of classes) {
        if (selector.includes("." + cls)) {
          isMatch = true;
          break;
        }
      }

      // اگر شامل هیچ کلاس موردنظر نبود، بلاک رو اسکپ کن
      if (!isMatch) {
        i++;
        continue;
      }

      // brace count
      let braceCount = 0;
      let blockStart = i;
      while (i < css.length) {
        if (css[i] === "{") braceCount++;
        if (css[i] === "}") braceCount--;

        i++;
        if (braceCount === 0) break;
      }

      const block = css.slice(selectorStart, i).trim();
      result.push(block);
    } else {
      i++;
    }
  }

  return result.join("\n\n");
}

// ---------------------------------------------------------

function extractMediaQueries(css, classes) {
  const results = [];

  let pos = css.indexOf("@media");
  while (pos !== -1) {
    let start = pos;
    let i = pos;

    let braceCount = 0;
    while (i < css.length) {
      if (css[i] === "{") braceCount++;
      if (css[i] === "}") braceCount--;
      i++;
      if (braceCount === 0) break;
    }

    const block = css.slice(start, i);

    let contains = false;
    for (const cls of classes) {
      if (block.includes("." + cls)) {
        contains = true;
        break;
      }
    }

    if (contains) results.push(block);

    pos = css.indexOf("@media", pos + 1);
  }

  return results.join("\n\n");
}

// ---------------------------------------------------------

function run() {
  const component = fs.readFileSync(COMPONENT_FILE, "utf8");
  const css = fs.readFileSync(BIG_CSS_FILE, "utf8");

  const classes = extractClassesFromJsx(component);

  console.log("Classes detected:");
  console.log(classes);

  const normalCss = extractCssBlocks(css, classes);
  const mediaCss = extractMediaQueries(css, classes);

  const finalCss = normalCss + "\n\n" + mediaCss;

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, finalCss);

  console.log("CSS extracted successfully →", OUTPUT_FILE);
}

run();

// const fs = require("fs");
// const path = require("path");

// const COMPONENT_FILE = "./src/components/templates/product-page/Gallery.js";
// const BIG_CSS_FILE = "./main.css";
// const OUTPUT_FILE = "./extracted/ProductCard.css";

// function extractClassesFromJsx(content) {
//   const classes = new Set();

//   // 1. حالت کلاس‌های استرینگ ساده در JSX
//   const simpleRegex = /className\s*=\s*["'`](.*?)["'`]/g;
//   let match;
//   while ((match = simpleRegex.exec(content))) {
//     match[1].split(/\s+/).forEach((c) => classes.add(c.trim()));
//   }

//   // 2. حالت‌های CSS Modules -> styles.someClass
//   const moduleRegex = /styles\.([A-Za-z0-9_-]+)/g;
//   while ((match = moduleRegex.exec(content))) {
//     classes.add(match[1].trim());
//   }

//   // 3. حالت styles["something"]
//   const moduleBracketRegex = /styles\[['"`]([^"'`]+)['"`]\]/g;
//   while ((match = moduleBracketRegex.exec(content))) {
//     classes.add(match[1].trim());
//   }

//   return Array.from(classes);
// }

// function extractCssBlocks(css, classes) {
//   let result = "";

//   // remove imports
//   css = css.replace(/@import[^;]+;/g, "");

//   // only class selectors
//   const blocks = css.match(/\.[A-Za-z0-9_-][^{]*\{[^}]*\}/g) || [];

//   blocks.forEach((block) => {
//     classes.forEach((cls) => {
//       if (block.includes("." + cls)) {
//         result += block + "\n\n";
//       }
//     });
//   });

//   return result;
// }

// function extractMediaQueries(css, classes) {
//   let result = "";

//   const mediaStartRegex = /@media[^{]+\{/g;
//   let match;

//   while ((match = mediaStartRegex.exec(css))) {
//     let start = match.index;
//     let braceCount = 0;
//     let end = start;

//     for (let i = start; i < css.length; i++) {
//       if (css[i] === "{") braceCount++;
//       if (css[i] === "}") braceCount--;

//       if (braceCount === 0) {
//         end = i + 1;
//         break;
//       }
//     }

//     const mediaBlock = css.slice(start, end);

//     let containsClass = false;

//     classes.forEach((cls) => {
//       if (mediaBlock.includes("." + cls)) {
//         containsClass = true;
//       }
//     });

//     if (containsClass) {
//       result += mediaBlock + "\n\n";
//     }
//   }

//   return result;
// }

// function run() {
//   const component = fs.readFileSync(COMPONENT_FILE, "utf8");
//   const css = fs.readFileSync(BIG_CSS_FILE, "utf8");

//   const classes = extractClassesFromJsx(component);

//   console.log("Classes detected:");
//   console.log(classes);

//   const normalCss = extractCssBlocks(css, classes);
//   const mediaCss = extractMediaQueries(css, classes);

//   const finalCss = normalCss + "\n" + mediaCss;

//   fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });

//   fs.writeFileSync(OUTPUT_FILE, finalCss);

//   console.log("CSS extracted successfully →", OUTPUT_FILE);
// }

// run();
