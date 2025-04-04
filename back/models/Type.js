import { Model, DataTypes } from 'sequelize';
import { sequelize } from './connection.js';

export class Type extends Model {}

Type.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING(7),
        allowNull: false
      }
    },
    {
        sequelize,
        tableName: 'type',
    }
);