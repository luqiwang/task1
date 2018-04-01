defmodule Task3Web.PageController do
  use Task3Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
