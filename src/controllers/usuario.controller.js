import bcrypt from 'bcryptjs';
import { Usuario } from '../models/usuario.model.js';

export async function perfil(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ['senha'] },
    });

    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

export async function atualizarPerfil(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    const { nome, email, senha } = req.body;

    if (email !== undefined && email !== usuario.email) {
      const outro = await Usuario.findOne({ where: { email } });
      if (outro && outro.id !== usuario.id) {
        return res.status(409).json({ erro: 'E-mail já cadastrado' });
      }
      usuario.email = email;
    }
    if (nome !== undefined) {
      usuario.nome = nome;
    }
    if (senha !== undefined && senha !== '') {
      usuario.senha = await bcrypt.hash(senha, 10);
    }

    await usuario.save();

    const atualizado = await Usuario.findByPk(usuario.id, {
      attributes: { exclude: ['senha'] },
    });

    return res.status(200).json(atualizado);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

export async function desativarConta(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id);
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    usuario.ativo = false;
    await usuario.save();

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}
