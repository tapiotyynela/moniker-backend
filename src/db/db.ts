import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

const connection = new Sequelize(process.env.POSTGRES_DB || '', process.env.POSTGRES_USER || '', process.env.POSTGRES_PW || '', {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
})

export const initializeDb = (models: any) => {
    const db: any = {}
    models.map((m: any) => {
        db[m] = m
    })
}

export default connection