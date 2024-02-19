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
  static getAll = async ({ userEmail }) => {
    const [role] = await connection.query('SELECT role FROM users u WHERE u.email = ?;', [userEmail])

    console.log()
    if (role[0].role !== 'a') {
      console.log('hola :D')
      return 'Unauthorized'
    }

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
      const token = generateToken({ email, role })
      return { jwt: token.token, role: role[0].role }
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static register = async ({ input }) => {
    const { email, password, role } = input
    // validar datos .....
    try {
      const x = await connection.query('insert into users (email, password, role) values (?,?,?);', [email, password, role])
      console.log(x)
      return 'created'
    } catch (e) {
      return e.message
    }
  }
}
