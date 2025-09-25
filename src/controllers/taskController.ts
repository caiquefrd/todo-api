import { Task, TaskStatus } from '../models/Task';
import * as taskDb from '../database/taskDb';

export const getAllTasks = async (): Promise<Task[]> => {
  return await taskDb.readTasks();
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  return await taskDb.getTaskById(id);
};

export const createTask = async (titulo: string, descricao: string, status: TaskStatus): Promise<Task> => {
  return await taskDb.createTask(titulo, descricao, status);
};

export const updateTask = async (id: number, titulo: string, descricao: string, status: TaskStatus): Promise<Task | null> => {
  return await taskDb.updateTask(id, titulo, descricao, status);
};

export const deleteTask = async (id: number): Promise<boolean> => {
  return await taskDb.deleteTask(id);
};
