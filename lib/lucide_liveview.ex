defmodule LucideLiveview do
  @external_resource readme = Path.join([__DIR__, "../README.md"])

  @doc_header """
  Lucide LiveView is an Elixir package that integrates **Lucide Icons** into Phoenix LiveView applications.
  """

  @doc_footer readme
              |> File.read!()
              |> String.split("<!-- MDOC -->")
              |> Enum.fetch!(1)

  @moduledoc @doc_header <> @doc_footer
end
