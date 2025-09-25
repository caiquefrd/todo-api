import { Pool } from 'pg';
import { Task, TaskStatus } from '../models/Task';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  database: process.env.DB_NAME || 'todo',
});

export const readTasks = async (): Promise<Task[]> => {
  const result = await pool.query('SELECT * FROM tasks');
  return result.rows;
};

export const createTask = async (titulo: string, descricao: string, status: TaskStatus): Promise<Task> => {
  const result = await pool.query(
    'INSERT INTO tasks (titulo, descricao, status) VALUES ($1, $2, $3) RETURNING *',
    [titulo, descricao, status]
  );
  return result.rows[0];
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
  return result.rows[0];
};

export const updateTask = async (id: number, titulo: string, descricao: string, status: TaskStatus): Promise<Task | null> => {
  const result = await pool.query(
    'UPDATE tasks SET titulo = $1, descricao = $2, status = $3 WHERE id = $4 RETURNING *',
    [titulo, descricao, status, id]
  );
  return result.rows[0] || null;
};

export const deleteTask = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
