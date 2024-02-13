import { UserModel } from "../models/users.js"
import jwt from 'jsonwebtoken'
import { SECRET } from '../../index.js'
export class UserController {

    static getAll = async (req, res) => {
        try {
            const { authorization } = req.headers
            const token = authorization.split(' ')[1]

            const decoded = jwt.verify(token, SECRET)

            if (Date.now() > decoded.exp) {
                throw new Error('Token expired')
            }

            const users = await UserModel.getAll()
            res.status(200).send(users)

        } catch (error) {
            res.status(401).send(error.message)
        }
    }
    static findById = async (req, res) => {
        const resp = await UserModel.findById(req)
        res.status(200).send(resp)
    }

    static login = async (req, res) => {
        console.log(req.body)
        const { user, password } = req.body
        console.log(user, password)
        res.status(200).send('el login')
    }
}