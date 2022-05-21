import { Sequelize } from 'sequelize';

const connection = new Sequelize('postgres://localhost:5432/moniker')
connection.authenticate()

export const initializeDb = (models: any) => {
    const db: any = {}
    models.map((m: any) => {
        db[m] = m
    })
}

export default connection