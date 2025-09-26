import { Request, Response } from 'express';
import { createUser, getUserByUsername } from '../database/userDb';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  const existing = await getUserByUsername(username);
  if (existing) {
    return res.status(409).json({ error: 'username already exists' });
  }
  const user = await createUser(username, password);
  res.status(201).json({ id: user.id, username: user.username });
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }
  const user = await getUserByUsername(username);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'invalid credentials' });
  }
  // Gera o token JWT
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
