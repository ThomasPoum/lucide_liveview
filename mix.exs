defmodule LucideLiveview.MixProject do
  use Mix.Project

  def project do
    [
      app: :lucide_1,
      version: "0.1.0",
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      aliases: aliases(),
      description: "Lucide Icons integration for Phoenix LiveView",
      package: package_info(),
      source_url: "https://github.com/votre-github/lucide_liveview"
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:phoenix_live_view, "~> 1.0.3"},
      {:phoenix_html, "~> 3.3"}
    ]
  end

  defp aliases do
    [
      "deps.get": [
        "deps.get",
        "cmd npm install --prefix assets",
        "cmd node assets/install.js",
        "cmd node assets/setup_core_components.js"
      ]
    ]
  end

  defp package_info do
    [
      maintainers: ["Thomas Poumarède"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/votre-github/lucide_liveview"},
      files: ~w(lib assets mix.exs README.md LICENSE)
    ]
  end
end
