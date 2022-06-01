import { NextFunction, Request, Response } from "express"
import {Op} from "sequelize"
import User from '../models/user'
import jwt from 'jsonwebtoken'
import { RequestWithUser } from "../types/request"

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
        if(user && user?.validPassword(req.body.password, user.password)) {
            const jwtSecretKey = process.env.JWT_SECRET_KEY as string
            const data = {
                userId: user.userId,
                firstName: user.firstName,
                lastName: user.lastName
            }
            const token = jwt.sign(data, jwtSecretKey)
            res.status(200).send({
                token,
                user
            })
        } else {
            res.status(401).send("Virheellinen sähköposti tai salasana")
        }
    } catch (error) {
        res.send('Something went wrong')
    }
}

export const getUsersBySearchWord = async (req: RequestWithUser, res: Response) => {
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