import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export class SessionsModel {
  static getSessions = async ({ classId, userEmail }) => {
    try {
      const role = await prisma.users.findUnique({
        where: {
          email: userEmail
        },
        select: {
          role: true
        }
      })

      if (role.role.toLowerCase() !== 'i') throw new Error('Unauthorized')

      const classes = await prisma.sessions.findMany({
        where: {
          UUID_Class: classId
        }
      })
      return classes
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static createSession = async ({ input, userEmail }) => {
    const role = await prisma.users.findUnique({
      where: {
        email: userEmail
      },
      select: {
        role: true
      }
    })

    if (role.role.toLowerCase() !== 'i') throw new Error('Unauthorized')
    const { dataTime, uuidClass, instructorEmail } = input
    try {
      await prisma.sessions.create({
        data: {
          data_time: dataTime,
          UUID_Class: uuidClass,
          instructorEmail
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static deleteSession = async ({ input, userEmail }) => {
    const role = await prisma.users.findUnique({
      where: {
        email: userEmail
      },
      select: {
        role: true
      }
    })

    if (role.role.toLowerCase() !== 'i') throw new Error('Unauthorized')
    const { dataTime, uuidClass } = input
    try {
      await prisma.sessions.delete({
        where: {
          data_time_UUID_Class: {
            data_time: dataTime,
            UUID_Class: uuidClass
          }
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
