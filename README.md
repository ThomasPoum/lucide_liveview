# Lucide LiveView

<!-- MDOC -->

## ✨ Features

- ✅ **Automatic installation** via setup script
- ✅ **No manual setup required**
- ✅ **Direct integration into** `core_components.ex`
- ✅ **Fully compatible with TailwindCSS**


## ⚠️ Requirements

Before using **Lucide LiveView**, ensure that your project meets the following requirements:

1. **Phoenix LiveView 1.0.3 or later**  
   The package relies on LiveView components to render icons efficiently. You must have **LiveView 1.0.3 or higher** installed in your project.

2. **TailwindCSS Enabled**  
   Lucide LiveView uses **TailwindCSS** to style and display icons properly. Ensure that Tailwind is installed and configured in your project.

3. **`core_components.ex` File Present**  
   The package automatically integrates Lucide icons into `core_components.ex`. This file must exist in `lib/YOUR_APP_web/components/` for the setup to work correctly.

4. **Assets Pipeline Configured**  
   Since Lucide icons are loaded from `node_modules/lucide-static/`, your project must have the **Phoenix asset pipeline** properly set up, including `assets/node_modules/`.

5. **Node.js and npm Installed**  
   The package depends on `lucide-static`, which is managed via `npm`. Ensure that **Node.js and npm are installed** before running the setup script.

6. **A Working Phoenix Project**  
   This package is designed for **Phoenix 1.7+** applications. If you are using an older version, consider upgrading to benefit from **LiveView components and Tailwind integration**.

📌 If your project meets these requirements, **follow the installation instructions below!**


## 🚀 Installation

Lucide LiveView is available on **Hex.pm**. To install it:

1. Add the dependency to your `mix.exs` file:

```elixir
defp deps do
  [
    {:lucide_liveview, "~> 0.1.0"}
  ]
end
```

2. Install dependencies and run the setup script:

```sh
mix deps.get
node deps/lucide_liveview/assets/setup.js
```

📌 That's it! The setup script will automatically:
- Install `lucide-static` in your assets directory
- Configure TailwindCSS for Lucide icons
- Add Lucide icon support to your `core_components.ex`

## 🎨 Usage

Once installed, you can use Lucide icons directly in your templates with the `<.icon>` component.

### Basic Example

```elixir
<.icon name="lucid-house" class="w-6 h-6 text-gray-500" />
```

This will render the home icon using Tailwind classes.

### Customizing Icons

You can customize the size, color, and other attributes using Tailwind:

```elixir
<.icon name="lucid-music" class="w-8 h-8 text-blue-500" />
```

### How It Works

- The package automatically installs `lucide-static` in `assets/node_modules/`
- The `<.icon>` component is automatically added to `core_components.ex`
- TailwindCSS is automatically configured to use Lucide icons

## ⚙️ Compatibility

| Feature      | Supported |
|--------------|-----------|
| Phoenix      | ✅ 1.7+   |
| LiveView     | ✅ 1.0+   |
| TailwindCSS  | ✅ Yes    |

## 🛠 Development

To contribute or modify this package, clone the repository and install dependencies:

```sh
git clone https://github.com/ThomasPoum/lucide_liveview.git
cd lucide_liveview
mix deps.get
```

For testing:

```sh
mix test
```

## 🔗 Links

- Hex.pm: https://hex.pm/packages/lucide_liveview
- GitHub: https://github.com/ThomasPoum/lucide_liveview

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

<!-- MDOC -->