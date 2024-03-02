import { generateToken } from '../../utilFunctions.js'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'

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

  static updateUser = async ({ input }) => {
    const { email, password, role } = input

    let newPassword = password
    // se podría hacer con un trigger? Sí, pero me da todo el palo de hacerlo en SQL
    try {
      const oldUserData = await prisma.users.findUnique({
        where: {
          email
        }
      })

      if (password !== undefined && password !== oldUserData.password) {
        newPassword = await bcrypt.hash(password, 10)
      }

      if (email === oldUserData.email && role === oldUserData.role.toLowerCase() && newPassword === oldUserData.password) {
        return
      }

      await prisma.users.update({
        where: {
          email
        },
        data: {
          password: newPassword,
          role
        }
      })

      if (role !== undefined && role.toLowerCase() !== oldUserData.role.toLocaleLowerCase()) {
        switch (oldUserData.role.toLowerCase()) {
          case 'c': {
            await prisma.clients.delete({
              where: {
                email
              }
            })
            break
          }
          case 'i': {
            await prisma.instructors.delete({
              where: {
                email
              }
            })
            break
          }
          default: {
            break
          }
        }

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
      }
    } catch (e) {
      throw new Error(e.message)
    }
  }

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
