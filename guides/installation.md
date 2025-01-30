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
node assets/setup.js
```

📌 That's it! The setup script will automatically:
- Install `lucide-static` in your assets directory
- Configure TailwindCSS for Lucide icons
- Add Lucide icon support to your `core_components.ex`