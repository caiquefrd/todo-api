-- Criação da tabela de tarefas para PostgreSQL
CREATE TABLE IF NOT EXISTS tasks (
  id SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  status TEXT CHECK(status IN ('pendente', 'concluída')) NOT NULL
);
