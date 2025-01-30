defmodule LucideLiveview.MixProject do
  use Mix.Project

  def project do
    [
      app: :lucide_liveview,
      version: "0.1.0",
      elixir: "~> 1.16",
      start_permanent: Mix.env() == :prod,
      description: "Lucide Icons integration for Phoenix LiveView",
      package: package_info(),
      deps: deps(),
      source_url: "https://github.com/ThomasPoum/lucide_liveview"
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:ex_doc, "~> 0.29.1", only: :dev, runtime: false}
    ]
  end

  defp package_info do
    [
      maintainers: ["Thomas Poumarède"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/ThomasPoum/lucide_liveview"},
      files: ~w(lib assets mix.exs README.md guides LICENSE)
    ]
  end
end
