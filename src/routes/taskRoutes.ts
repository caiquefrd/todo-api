import { Router } from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { TaskStatus } from '../models/Task';

const router = Router();

// GET /tarefas - listar tarefas
router.get('/tarefas', async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
});

// POST /tarefas - criar tarefa
router.post('/tarefas', async (req, res) => {
  const { titulo, descricao, status } = req.body;
  if (!titulo || !descricao || !status) {
    return res.status(400).json({ error: 'Campos obrigatórios: titulo, descricao, status' });
  }
  const newTask = await createTask(titulo, descricao, status as TaskStatus);
  res.status(201).json(newTask);
});

// GET /tarefas/:id - obter tarefa
router.get('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id);
  const task = await getTaskById(id);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(task);
});

// PUT /tarefas/:id - atualizar tarefa
router.put('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, descricao, status } = req.body;
  if (!titulo || !descricao || !status) {
    return res.status(400).json({ error: 'Campos obrigatórios: titulo, descricao, status' });
  }
  const updated = await updateTask(id, titulo, descricao, status as TaskStatus);
  if (!updated) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(updated);
});

// DELETE /tarefas/:id - remover tarefa
router.delete('/tarefas/:id', async (req, res) => {
  const id = Number(req.params.id);
  const removed = await deleteTask(id);
  if (!removed) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.status(204).send();
});

export default router;
