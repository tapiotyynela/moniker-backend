import { Request, Response } from "express"

export const getUser = ((req: Request, res: Response) => {
    return console.log("GET USER")
})