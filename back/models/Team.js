import { Model, DataTypes } from 'sequelize';
import { sequelize } from './connection.js';

export class Team extends Model {}

Team.init(
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
      description: {
        type: DataTypes.TEXT
      }
    },
    {
        sequelize,
        tableName: 'team',
    }
);
