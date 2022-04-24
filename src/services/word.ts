import { Request, Response } from "express"
import Word from '../models/word'

export const addWord = async (req: Request, res: Response) => {
    try {
        const newWord = await Word.create(req.body)
        res.status(200).send(newWord)
    } catch (error) {
        res.send('Something went wrong')
    }
}