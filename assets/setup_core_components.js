const fs = require("fs");
const path = require("path");

const appPath = path.join(__dirname, "../lib");
const appFiles = fs.readdirSync(appPath);
const appName = appFiles.find((file) => file.endsWith("_web.ex"));
const coreComponentsPath = path.join(appPath, appName.replace(/\.ex$/, ""), "components/core_components.ex");

console.log("🔍 Checking CoreComponents at:", coreComponentsPath);

if (!fs.existsSync(coreComponentsPath)) {
  console.log("❌ core_components.ex not found. Skipping modification.");
  process.exit(0);
}

const fileContent = fs.readFileSync(coreComponentsPath, "utf-8");

if (fileContent.includes("def icon(%{name: \"lucid-\"")) {
  console.log("✅ Lucid icon support already present in CoreComponents.");
  process.exit(0);
}

console.log("✍️ Adding Lucid icon support to CoreComponents...");

// 🛠 Nouvelle fonction pour les icônes Lucide
const newFunction = `
  def icon(%{name: "lucid-" <> _} = assigns) do
    ~H"""
    <span id={@id} class={[@name, "relative", @class]} style={@style} title={@title} {@rest} />
    """
  end
`;

// 🛠 Trouver la position de `def icon(%{name: "hero-`
const heroIconPosition = fileContent.indexOf('def icon(%{name: "hero-');

if (heroIconPosition === -1) {
  console.log("❌ Could not find `hero-` function in CoreComponents. Skipping modification.");
  process.exit(0);
}

// Trouver la position exacte **où insérer** après `hero-`
const endOfHeroFunction = fileContent.indexOf("end", heroIconPosition);
if (endOfHeroFunction === -1) {
  console.log("❌ Could not find end of `hero-` function. Skipping modification.");
  process.exit(0);
}

const insertPosition = endOfHeroFunction + 3;

// 📝 Ajouter la nouvelle fonction juste après `hero-`
const beforeInsert = fileContent.substring(0, insertPosition);
const afterInsert = fileContent.substring(insertPosition);
const updatedContent = beforeInsert + `\n${newFunction}` + afterInsert;


fs.writeFileSync(coreComponentsPath, updatedContent, "utf-8");

console.log("✅ Lucid icon support added successfully!");
