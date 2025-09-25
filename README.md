# To-Do API

A simple RESTful API for managing tasks (To-Do), built with TypeScript, Express, and PostgreSQL.

## Features
- CRUD for tasks: create, list, update, delete
- Fields: `titulo`, `descricao`, `status` ("pendente" or "concluída")
- REST endpoints: `/tarefas`, `/tarefas/:id`

## Requirements
- Node.js >= 18
- PostgreSQL >= 12

## Setup

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd todo_api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the database:**
   - Create a PostgreSQL database (default: `todo`)
   - Create a user and set the password (default: `todo`/`todo123`)
   - Update your connection settings in `src/database/taskDb.ts` or use environment variables:
     - `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
   - Run the following SQL to create the table:
     ```sql
     CREATE TABLE IF NOT EXISTS tasks (
       id SERIAL PRIMARY KEY,
       titulo TEXT NOT NULL,
       descricao TEXT NOT NULL,
       status TEXT CHECK(status IN ('pendente', 'concluída')) NOT NULL
     );
     ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Run the project:**
   - For development (auto-reload):
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

## API Endpoints

- `GET    /tarefas`           — List all tasks
- `POST   /tarefas`           — Create a new task
- `GET    /tarefas/:id`       — Get a task by ID
- `PUT    /tarefas/:id`       — Update a task by ID
- `DELETE /tarefas/:id`       — Delete a task by ID

## Example Task JSON
```json
{
  "titulo": "Estudar Node.js",
  "descricao": "Ler documentação oficial",
  "status": "pendente"
}
```

---

Feel free to contribute or open issues!
