import { Request, Response } from "express"
import User from '../models/user'

export const registerUser = (async (req: Request, res: Response) => {
    try {
        // const tapio = await User.findOne({
        //     where: {
        //         id: 3 
        //     }
        // })
        // if(await tapio?.validPassword('testtest', tapio.password)) {
        //     console.log("SALASANA OIKEIN")
        // } else {
        //     console.log("SALASANA VÄÄRIN")
        // }
        const newUser = await User.create(req.body)
        res.status(200).send(newUser)
    } catch (error) {
        res.send('Something went wrong')
    }
})

export const login = (async (req: Request, res: Response) => {
    try {
        console.log("BPDY", req.body)
        const user = await User.findOne({
            where: {
                email: req.body.email 
            }
        })
        if(await user?.validPassword(req.body.password, user.password)) {
            res.send("KIJAUTUMINEN ONNISTUI")
        } else {
            res.send("SALASANA VÄÄRIN")
        }
    } catch (error) {
        res.send('Something went wrong')
    }
})