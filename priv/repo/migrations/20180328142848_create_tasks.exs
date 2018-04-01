defmodule Task3.Repo.Migrations.CreateTasks do
  use Ecto.Migration

  def change do
    create table(:tasks) do
      add :title, :string
      add :body, :text
      add :time, :integer
      add :creater_id, references(:users, on_delete: :nothing)
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end

    create index(:tasks, [:creater_id])
    create index(:tasks, [:user_id])
  end
end
