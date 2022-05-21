import { Request, Response } from "express"
import {Op} from "sequelize"
import User from '../models/user'

export const findUserByNickname = async (nickName: string): Promise<User | null> => {
    return User.findOne({
        where: {
            nickName: nickName
        }
    })
}

export const registerUser = async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body)
        res.status(200).send(newUser)
    } catch (error) {
        res.send('Something went wrong')
    }
}

export const login = async (req: Request, res: Response) => {
    try {
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
}

export const getUsersBySearchWord = async (req: Request, res: Response) => {
    try {
        const { word } = req.body
        const usersByNickName = await User.findAll({
            where: {
                nickName: {
                    [Op.like]: `${word}%`
                }
            }
        })
        res.send(usersByNickName) 
    } catch (error) {
        res.send('Something went wrong')
    }
}