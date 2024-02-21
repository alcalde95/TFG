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
  static getUsers = async ({ userEmail }) => {
    // preguntar a dani si meto esto en una función y la llamo desde el controlador :D
    const [role] = await connection.query('SELECT u.role FROM users u WHERE u.email = ?;', [userEmail])

    console.log()
    if (role[0].role.toLowerCase() !== 'a') {
      console.log('hola :D')
      return 'Unauthorized'
    }

    const [users] = await connection.query('SELECT u.* FROM users u;')
    return users
  }

  static getAllUsers = async ({ userEmail }) => {
    // preguntar a dani si meto esto en una función y la llamo desde el controlador :D
    const [role] = await connection.query('SELECT role FROM users u WHERE u.email = ?;', [userEmail])

    console.log()
    if (role[0].role.toLowerCase() !== 'a') {
      console.log('hola :D')
      return 'Unauthorized'
    }

    const [admins] = await connection.query('SELECT u.* FROM users u where LOWER(u.role) = ?;', ['a'])

    const [clients] = await connection.query('SELECT c.UUID_Client,u.email FROM users u, clients c WHERE u.email = c.email;')

    const [instructors] = await connection.query('SELECT i.UUID_Instructor,u.email FROM users u, instructors i WHERE u.email = i.email;')
    return { admins, clients, instructors }
  }

  static findById = async ({ id }) => {
    return id
  }

  static login = async ({ email, password }) => {
    try {
      const [role] = await connection.query('SELECT u.role FROM users u WHERE u.email = ? AND u.password = ?;', [email, password])

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
      await connection.query('insert into users (email, password, role) values (?,?,?);', [email, password, role])

      switch (role.toLowerCase()) {
        case 'c': {
          console.log('hola c')
          const UUIDClient = crypto.randomUUID()
          await connection.query('insert into Clients(email,UUID_Client) values (?,?);', [email, UUIDClient])
          break
        }
        case 'i': {
          console.log('hola c')
          const UUIDInstructor = crypto.randomUUID()
          await connection.query('insert into Instructors(email,UUID_Instructor) values (?,?);', [email, UUIDInstructor])
          break
        }
        default: {
          break
        }
      }

      return 'created'
    } catch (e) {
      return 'ERROR: user already exists'
    }
  }

  static deleteUser = async ({ email }) => {
    try {
      await connection.query('delete from users where email = ?;', [email])
      return 'deleted'
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
