import { UserModel } from "../models/users.js"
import { authorized } from "../../utilFunctions.js"
export class UserController {

    static getAll = async (req, res) => {

        try {
            const { authorization } = req.headers
            const token = authorization.split(' ')[1]
            if (authorized({ token })) {

                const users = await UserModel.getAll()
                res.json(users)
            } else {
                res.status(401).send('Unauthorized')
            }
        } catch (error) {
            res.status(500).send(error.message)
        }
    }

    static findById = async (req, res) => {
        const { id } = req.params
        const resp = await UserModel.findById({ id })
        res.send(resp)
    }
    //TODO revisar, funciona mal
    static login = async (req, res) => {
        const { email, password } = req.body
        const {token,role} = await UserModel.login({ email, password })
        res.status(200).json({token,role})
    }


    static register = async (req, res) => {
                
        //validar datos .....
        

        const { email, password, role } = req.body
        const created = await UserModel.register({ email, password, role })
        created ? res.status(201).send('Created') : res.status(400).send('Bad request')
    }

}