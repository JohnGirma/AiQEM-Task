import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('task_manager', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  }
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connection established'))
  .catch(err => console.error('Unable to connect to database:', err));

export default sequelize; 