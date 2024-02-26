// import mysql from 'mysql2/promise'
import { generateToken } from '../../utilFunctions.js'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

/* const config = {
  host: 'localhost',
  user: 'alcalde',
  port: 3306,
  password: 'alcalde',
  database: 'gymclass'
}
*/
const prisma = new PrismaClient()
export class UserModel {
  static getUsers = async ({ userEmail }) => {
    try {
      const role = await prisma.users.findUnique({
        where: {
          email: userEmail
        },
        select: {
          role: true
        }
      })

      if (role.role.toLowerCase() !== 'a') {
        throw new Error('Unauthorized')
      }

      const users = await prisma.users.findMany()
      return users
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static getAllUsers = async ({ userEmail }) => {
    // preguntar a dani si meto esto en una función y la llamo desde el controlador :D
    const role = await prisma.users.findUnique({
      where: {
        email: userEmail
      },
      select: {
        role: true
      }
    })

    if (role.role.toLowerCase() !== 'a') {
      return 'Unauthorized'
    }

    const admins = await prisma.users.findMany({
      where: {
        role: { in: ['a', 'A'] }
      }
    })
    const clients = await prisma.users.findMany({
      where: {
        role: { in: ['c', 'C'] }
      }
    })
    const instructors = await prisma.users.findMany({
      where: {
        role: { in: ['I', 'i'] }
      }
    })
    return { admins, clients, instructors }
  }

  static findById = async ({ id }) => {
    return id
  }

  static login = async ({ input }) => {
    try {
      const { email, password } = input

      const resp = await prisma.users.findUnique({
        where: {
          email
        },
        select: {
          role: true,
          password: true
        }
      })
      const response = await bcrypt.compare(password, resp.password)
      if (!response) {
        throw new Error('Unauthorized')
      }

      if (resp.length === 0) {
        throw new Error('Unauthorized')
      }
      const token = generateToken({ email, resp })
      return { jwt: token.token, role: resp.role }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static register = async ({ input }) => {
    const { email, password, role } = input
    // validar datos .....
    try {
      await prisma.users.create({
        data: {
          email,
          password,
          role
        }
      })
      switch (role.toLowerCase()) {
        case 'c': {
          await prisma.clients.create({
            data: {
              email
            }
          })
          break
        }
        case 'i': {
          await prisma.instructors.create({
            data: {
              email
            }
          })
          break
        }
        default: {
          break
        }
      }
    } catch (e) {
      throw new Error('User already exists')
    }
  }

  // contraseña cifrada en la bbdd y con salt
  // hasehar contraseñas con hash
  // med5(hash) + salt

  static deleteUser = async ({ email }) => {
    try {
      await prisma.users.delete({
        where: {
          email
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
