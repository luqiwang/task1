defmodule Task2Web.PageController do
  use Task2Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
