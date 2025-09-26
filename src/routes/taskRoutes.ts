import { Router } from 'express';
import { getAllTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { TaskStatus } from '../models/Task';
import { authenticateJWT, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /tarefas - listar tarefas (apenas do usuário autenticado)
router.get('/tarefas', authenticateJWT, async (req: AuthRequest, res) => {
  const userId = req.user!.userId;
  const tasks = await getAllTasks(userId);
  res.json(tasks);
});

// POST /tarefas - criar tarefa
router.post('/tarefas', authenticateJWT, async (req: AuthRequest, res) => {
  const { titulo, descricao, status } = req.body;
  const userId = req.user!.userId;
  if (!titulo || !descricao || !status) {
    return res.status(400).json({ error: 'Campos obrigatórios: titulo, descricao, status' });
  }
  const newTask = await createTask(titulo, descricao, status as TaskStatus, userId);
  res.status(201).json(newTask);
});

// GET /tarefas/:id - obter tarefa
router.get('/tarefas/:id', authenticateJWT, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const userId = req.user!.userId;
  const task = await getTaskById(id, userId);
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(task);
});

// PUT /tarefas/:id - atualizar tarefa
router.put('/tarefas/:id', authenticateJWT, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const { titulo, descricao, status } = req.body;
  const userId = req.user!.userId;
  if (!titulo || !descricao || !status) {
    return res.status(400).json({ error: 'Campos obrigatórios: titulo, descricao, status' });
  }
  const updated = await updateTask(id, titulo, descricao, status as TaskStatus, userId);
  if (!updated) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(updated);
});

// DELETE /tarefas/:id - remover tarefa
router.delete('/tarefas/:id', authenticateJWT, async (req: AuthRequest, res) => {
  const id = Number(req.params.id);
  const userId = req.user!.userId;
  const removed = await deleteTask(id, userId);
  if (!removed) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.status(204).send();
});

export default router;
