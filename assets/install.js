const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectRoot = path.resolve(__dirname, "..");
const tailwindConfigPath = path.join(projectRoot, "assets/tailwind.config.js");
const iconsSource = path.join(projectRoot, "assets/node_modules/lucide-static/icons");

// 📌 Vérifier si `tailwind.config.js` existe
if (!fs.existsSync(tailwindConfigPath)) {
  console.log("❌ No tailwind.config.js found, skipping modification.");
  process.exit(0);
}

// 📦 Installer `lucide-static` dans `assets/node_modules/`
console.log("📦 Installing lucide-static locally...");
execSync("npm install lucide-static --prefix assets", { stdio: "inherit" });

// 📌 Vérifier si les icônes existent
if (!fs.existsSync(iconsSource)) {
    console.log("❌ Lucide icons not found. Something went wrong.");
    process.exit(1);
}

// 📌 Ajouter Lucide dans `tailwind.config.js`
console.log("✍️ Updating tailwind.config.js...");

const tailwindConfig = fs.readFileSync(tailwindConfigPath, "utf-8");
if (!tailwindConfig.includes("lucid")) {
  const newConfig = tailwindConfig.replace(
    /plugins: \[/,
    `plugins: [
      function ({ matchComponents, theme }) {
        const iconsDir = path.join(__dirname, './node_modules/lucide-static/icons'); 
        const values = {};
        fs.readdirSync(iconsDir).forEach((file) => {
          const name = path.basename(file, '.svg');
          values[name] = { name, fullPath: path.join(iconsDir, file) };
        });
        matchComponents(
          {
            lucid: ({ name, fullPath }) => {
              const content = fs.readFileSync(fullPath).toString().replace(/\\r?\\n|\\r/g, '');
              return {
                [\`--lucid-\${name}\`]: \`url('data:image/svg+xml;utf8,\${content}')\`,
                '--webkit-mask': \`var(--lucid-\${name})\`,
                mask: \`var(--lucid-\${name})\`,
                'mask-repeat': 'no-repeat',
                'background-color': 'currentColor',
                'vertical-align': 'middle',
                display: 'inline-block',
                width: theme('spacing.5'),
                height: theme('spacing.5'),
              };
            },
          },
          { values }
        );
      },`
  );

  fs.writeFileSync(tailwindConfigPath, newConfig, "utf-8");
  console.log("✅ Added Lucide icon support to Tailwind.");
} else {
  console.log("✅ Lucide icons already configured in Tailwind.");
}
