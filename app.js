import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './src/config/database.js';
import './src/models/usuario.model.js';
import authRoutes from './src/routes/auth.routes.js';
import usuarioRoutes from './src/routes/usuario.routes.js';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuario', usuarioRoutes);

sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao sincronizar ou iniciar o servidor:', err);
    process.exit(1);
  });
