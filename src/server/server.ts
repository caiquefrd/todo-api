import express from 'express';
import taskRoutes from '../routes/taskRoutes';
import userRoutes from '../routes/userRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(taskRoutes);
app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
