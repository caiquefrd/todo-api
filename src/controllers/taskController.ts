import { Task, TaskStatus } from '../models/Task';
import * as taskDb from '../database/taskDb';

export const getAllTasks = async (userId: number): Promise<Task[]> => {
  return await taskDb.readTasks(userId);
};

export const getTaskById = async (id: number, userId: number): Promise<Task | undefined> => {
  return await taskDb.getTaskById(id, userId);
};

export const createTask = async (titulo: string, descricao: string, status: TaskStatus, userId: number): Promise<Task> => {
  return await taskDb.createTask(titulo, descricao, status, userId);
};

export const updateTask = async (id: number, titulo: string, descricao: string, status: TaskStatus, userId: number): Promise<Task | null> => {
  return await taskDb.updateTask(id, titulo, descricao, status, userId);
};

export const deleteTask = async (id: number, userId: number): Promise<boolean> => {
  return await taskDb.deleteTask(id, userId);
};
