import mysql from 'mysql2/promise'
import { generateToken } from '../../utilFunctions.js'

const config = {
    host: 'localhost',
    user: 'alcalde',
    port: 3306,
    password: 'alcalde',
    database: 'gymclass'
}

const connection = await mysql.createConnection(config)
export class UserModel {
    static getAll = async () => {
        const [users] = await connection.query('SELECT * FROM users;')
        return users
    }
    static findById = async ({ id }) => {

        return id
    }
    static login = async ({ email, password }) => {
        try {

            const [role] = await connection.query('SELECT role FROM users u WHERE u.email = ? AND u.password = ?;', [email, password])

            if (role.length === 0) {
                return null
            }
            const token = generateToken({ email: email, role: role })
            const response = { token, role: role }
            return [token, role[0]]
        } catch (e) {
            console.log(e.message)
            return null
        }
    }

    static register = async ({ email, password, role }) => {

        //validar datos .....
        try {
            const x = await connection.query('insert into users (email, password, role) values (?,?,?);', [email, password, role])
            return 'created'

        } catch (e) {
            return e.message
        }
    }

}