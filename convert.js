const fs = require("fs");
const path = require("path");

// Folder that contains HTML / JSX input files
const TARGET_DIR = "./src/raw-html";

const cssClasses = new Set();

// -----------------------
// Convert className="..." → className={styles["..."]}
// -----------------------
function convertClassNames(classList) {
  const classes = classList.trim().split(/\s+/);

  classes.forEach((c) => cssClasses.add(c));

  if (classes.length === 1) {
    return `className={styles["${classes[0]}"]}`;
  }

  const joined = classes.map((c) => `styles["${c}"]`).join(" + ' ' + ");

  return `className={${joined}}`;
}

// -----------------------
// Convert id="" → id={styles["id"]}
// -----------------------
function convertIdToModule(idValue) {
  cssClasses.add(idValue);
  return `id={styles["${idValue}"]}`;
}

// -----------------------
// Convert style="x: y; a: b;" → style={{ x: "y", a: "b" }}
// -----------------------
function convertInlineStyle(styleString) {
  const rules = styleString.split(";").filter(Boolean);

  const obj = rules
    .map((rule) => {
      const [key, value] = rule.split(":").map((x) => x.trim());
      if (!key || !value) return null;

      // تبدیل dash-case به camelCase
      const camelKey = key.replace(/-([a-z])/g, (_, chr) => chr.toUpperCase());

      return `${camelKey}: "${value}"`;
    })
    .filter(Boolean)
    .join(", ");

  return `style={{ ${obj} }}`;
}

// -----------------------
// Apply conversions to file content
// -----------------------
function convertHtml(content) {
  let result = content;

  // class or className
  result = result.replace(/class(Name)?="([^"]+)"/g, (m, _, classList) =>
    convertClassNames(classList),
  );

  // id
  result = result.replace(/id="([^"]+)"/g, (m, v) => convertIdToModule(v));

  // inline style
  result = result.replace(/style="([^"]+)"/g, (m, styleValue) =>
    convertInlineStyle(styleValue),
  );

  return result;
}

// -----------------------
// File processing
// -----------------------
function processFiles() {
  const files = fs.readdirSync(TARGET_DIR);

  files.forEach((file) => {
    const fullPath = path.join(TARGET_DIR, file);

    if (
      file.endsWith(".html") ||
      file.endsWith(".jsx") ||
      file.endsWith(".js")
    ) {
      const content = fs.readFileSync(fullPath, "utf8");

      const converted = convertHtml(content);

      const outPath = fullPath.replace(/\.html$/, ".jsx");

      fs.writeFileSync(outPath, converted, "utf8");

      console.log(`Converted → ${file}`);
    }
  });

  // Generate CSS module
  const cssContent = Array.from(cssClasses)
    .map((c) => `.${c} {\n  /* your styles */\n}`)
    .join("\n\n");

  fs.writeFileSync("./Sidebar.module.css", cssContent);

  console.log("CSS Module Generated → Sidebar.module.css");
}

processFiles();

// const fs = require("fs");
// const path = require("path");

// // Folder that contains HTML / JSX input files
// const TARGET_DIR = "./src/raw-html";

// const cssClasses = new Set();

// function convertClassNames(classList) {
//   const classes = classList.trim().split(/\s+/);

//   classes.forEach((c) => cssClasses.add(c));

//   if (classes.length === 1) {
//     return `className={styles["${classes[0]}"]}`;
//   }

//   const joined = classes.map((c) => `styles["${c}"]`).join(" + ' ' + ");

//   return `className={${joined}}`;
// }

// function convertIdToModule(idValue) {
//   // id را شبیه کلاس تبدیل می‌کنیم
//   cssClasses.add(idValue);
//   return `id={styles["${idValue}"]}`;
// }

// function convertHtml(content) {
//   let result = content;

//   // تبدیل className=""
//   result = result.replace(/className="([^"]+)"/g, (m, classList) =>
//     convertClassNames(classList),
//   );

//   // تبدیل id=""
//   result = result.replace(/id="([^"]+)"/g, (m, idValue) =>
//     convertIdToModule(idValue),
//   );

//   return result;
// }

// function processFiles() {
//   const files = fs.readdirSync(TARGET_DIR);

//   files.forEach((file) => {
//     const fullPath = path.join(TARGET_DIR, file);

//     if (
//       file.endsWith(".html") ||
//       file.endsWith(".jsx") ||
//       file.endsWith(".js")
//     ) {
//       const content = fs.readFileSync(fullPath, "utf8");

//       const converted = convertHtml(content);

//       const outPath = fullPath.replace(/\.html$/, ".jsx");

//       fs.writeFileSync(outPath, converted, "utf8");

//       console.log(`Converted → ${file}`);
//     }
//   });

//   // تولید CSS Module با class ها و id ها
//   const cssContent = Array.from(cssClasses)
//     .map((c) => `.${c} {\n  /* your styles */\n}`)
//     .join("\n\n");

//   fs.writeFileSync("./Sidebar.module.css", cssContent);

//   console.log("CSS Module Generated → Sidebar.module.css");
// }

// processFiles();
