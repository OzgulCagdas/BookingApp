import { Sequelize } from 'sequelize';

const sequelize = new Sequelize( 'test', 'root', 'metehan2014!', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;