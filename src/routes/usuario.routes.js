import { Router } from 'express';
import { autenticar } from '../middlewares/auth.middleware.js';
import * as usuarioController from '../controllers/usuario.controller.js';

const router = Router();

router.get('/perfil', autenticar, usuarioController.perfil);
router.put('/perfil', autenticar, usuarioController.atualizarPerfil);
router.delete('/conta', autenticar, usuarioController.desativarConta);

export default router;
