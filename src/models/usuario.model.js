import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

export const Usuario = sequelize.define(
  'Usuario',
  {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: 'usuarios',
    timestamps: true,
  }
);
