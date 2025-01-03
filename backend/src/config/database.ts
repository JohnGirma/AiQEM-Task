import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('task_manager', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

export default sequelize; 