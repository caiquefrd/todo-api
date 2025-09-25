export type TaskStatus = 'pendente' | 'concluída';

export interface Task {
  id: number;
  titulo: string;
  descricao: string;
  status: TaskStatus;
}
