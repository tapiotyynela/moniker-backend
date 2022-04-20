import { Sequelize } from 'sequelize';

const connection = new Sequelize('postgres://localhost:5432/moniker')

export default connection