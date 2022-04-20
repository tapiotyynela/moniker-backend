import { Request, Response } from "express"
import db from '../db/db'

export const getUser = (async (req: Request, res: Response) => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})