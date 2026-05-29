const fs = require("fs");
const path = require("path");

const rootDir = process.cwd();

const replacements = {
  "clip-path": "clipPath",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule",
};

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");
    let original = content;

    for (const [oldAttr, newAttr] of Object.entries(replacements)) {
      const regex = new RegExp(`\\b${oldAttr}=`, "g");
      content = content.replace(regex, `${newAttr}=`);
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, "utf8");
      console.log("✅ fixed:", filePath);
    }
  } catch (err) {
    // اگر فایل باینری بود یا قابل خواندن نبود رد می‌کنیم
  }
}

function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    if (
      fullPath.includes("node_modules") ||
      fullPath.includes(".next") ||
      fullPath.includes(".git")
    ) {
      continue;
    }

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      walk(fullPath);
    } else {
      processFile(fullPath);
    }
  }
}

walk(rootDir);

console.log("🎉 attribute fix finished");
