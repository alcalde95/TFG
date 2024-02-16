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
        const [users] = await connection.query('SELECT * FROM users')
        return users
    }
    static findById = async ({ id }) => {

        return id
    }
    static login = async ({ email, password }) => {
        try{

            const res = await connection.query('SELECT role FROM users WHERE email = ? AND password = ?', [email, password])
            console.log(res[0])
            if(res[0].length === 0){
                return false
            }
            const token = generateToken({ email:res[0].email , role:res[0].role })
            const role = res[0].role 
             return { token,role }
        }catch(e){
            console.log(e.message)
            return false
        }
    }

    static register = async ({ email, password, role }) => {

        //validar datos .....
        try{
            const x = await connection.query('insert into users (email, password, role) values (?,?,?)', [email, password, role])
            return true

        }catch(e){
            return false
        }
    }

}