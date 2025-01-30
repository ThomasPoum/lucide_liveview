const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Project paths
const projectRoot = process.cwd();
const tailwindConfigPath = path.join(projectRoot, "assets/tailwind.config.js");
const iconsSource = path.join(projectRoot, "assets/node_modules/lucide-static/icons");
const appPath = path.join(projectRoot, "lib");

console.log("🚀 Starting Lucide LiveView setup...\n");

// Step 1: Setup Tailwind Configuration
function setupTailwind() {
  console.log("🔍 Checking Tailwind config at:", tailwindConfigPath);

  if (!fs.existsSync(tailwindConfigPath)) {
    console.log("❌ No tailwind.config.js found, skipping modification.");
    return false;
  }

  // Install lucide-static if not present
  if (!fs.existsSync(iconsSource)) {
    console.log("📦 Installing lucide-static locally...");
    execSync("npm install lucide-static --prefix assets", { stdio: "inherit" });
  } else {
    console.log("✅ lucide-static already installed locally.");
  }

  // Verify icons installation
  if (!fs.existsSync(iconsSource)) {
    console.log("❌ Lucide icons not found. Something went wrong.");
    return false;
  }

  // Update Tailwind config
  console.log("✍️ Updating tailwind.config.js...");
  const tailwindConfig = fs.readFileSync(tailwindConfigPath, "utf-8");
  
  if (!tailwindConfig.includes("lucid")) {
    const newConfig = tailwindConfig.replace(
      /plugins: \[/,
      `plugins: [
        function ({ matchComponents, theme }) {
          const iconsDir = path.join(__dirname, 'node_modules/lucide-static/icons');
          const values = {};
          fs.readdirSync(iconsDir).forEach((file) => {
            const name = path.basename(file, '.svg');
            values[name] = { name, fullPath: path.join(iconsDir, file) };
          });
          matchComponents(
            {
              lucid: ({ name, fullPath }) => {
                const content = fs.readFileSync(fullPath).toString().replace(/\\r?\\n|\\r/g, '');
                let size = theme("spacing.6")
                return {
                  [\`--lucid-\${name}\`]: \`url('data:image/svg+xml;utf8,\${content}')\`,
                  '-webkit-mask': \`var(--lucid-\${name})\`,
                  'mask': \`var(--lucid-\${name})\`,
                  'mask-repeat': 'no-repeat',
                  'mask-position': 'center',
                  'mask-size': 'contain',
                  'background-color': 'currentColor',
                  'vertical-align': 'middle',
                  'display': 'inline-block',
                  'width': size,
                  'height': size,
                };
              },
            },
            { values }
          );
        },`
    );
    fs.writeFileSync(tailwindConfigPath, newConfig);
    console.log("✅ Tailwind configuration updated successfully.");
  } else {
    console.log("✅ Tailwind already configured for Lucide icons.");
  }
  
  return true;
}

// Step 2: Setup Core Components
function setupCoreComponents() {
  const appFiles = fs.readdirSync(appPath);
  const appName = appFiles.find((file) => file.endsWith("_web.ex"));
  const coreComponentsPath = path.join(appPath, appName.replace(/\.ex$/, ""), "components/core_components.ex");

  console.log("\n🔍 Checking CoreComponents at:", coreComponentsPath);

  if (!fs.existsSync(coreComponentsPath)) {
    console.log("❌ core_components.ex not found. Skipping modification.");
    return false;
  }

  const fileContent = fs.readFileSync(coreComponentsPath, "utf-8");

  if (fileContent.includes("def icon(%{name: \"lucid-\"")) {
    console.log("✅ Lucid icon support already present in CoreComponents.");
    return true;
  }

  console.log("✍️ Adding Lucid icon support to CoreComponents...");

  // New Lucide icon function
  const newFunction = `
  def icon(%{name: "lucid-" <> _} = assigns) do
    ~H"""
      <span class={[@name, @class]} />
    """
  end\n`;

  // Find position to insert after hero-icons
  const heroIconPosition = fileContent.indexOf('def icon(%{name: "hero-');

  if (heroIconPosition === -1) {
    console.log("❌ Could not find hero-icons function in CoreComponents. Skipping modification.");
    return false;
  }

  const endOfHeroFunction = fileContent.indexOf("end", heroIconPosition);
  if (endOfHeroFunction === -1) {
    console.log("❌ Could not find end of hero-icons function. Skipping modification.");
    return false;
  }

  // Insert new function after hero-icons
  const newContent = 
    fileContent.slice(0, endOfHeroFunction + 3) +
    newFunction +
    fileContent.slice(endOfHeroFunction + 3);

  fs.writeFileSync(coreComponentsPath, newContent);
  console.log("✅ CoreComponents updated successfully.");
  
  return true;
}

// Run setup
console.log("📦 Setting up Lucide LiveView...\n");

const tailwindSuccess = setupTailwind();
const coreComponentsSuccess = setupCoreComponents();

if (tailwindSuccess && coreComponentsSuccess) {
  console.log("\n✨ Lucide LiveView setup completed successfully!");
} else {
  console.log("\n⚠️ Setup completed with some warnings. Please check the logs above.");
}