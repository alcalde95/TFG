import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export class SessionsModel {
  static getSessions = async ({ classId, userEmail }) => {
    try {
      const sessions = await prisma.sessions.findMany({
        where: {
          UUID_Class: classId
        },
        include: {
          _count: {
            select: {
              session_client: true
            }
          }
        }
      })
      return sessions
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static getSession = async ({ classId, date, userEmail }) => {
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

      const session = await prisma.sessions.findMany({
        where: {
          UUID_Class: classId,
          data_time: date
        },
        include: {
          _count: {
            select: {
              session_client: true
            }
          }
        }
      })
      return session[0]
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

  static updateSession = async ({ input, userEmail }) => {
    try {
      const c = await prisma.class.findUnique({
        where: {
          UUID_Class: input.uuidClass
        }
      })
      if (c.instructorEmail !== userEmail) throw new Error('Unauthorized')

      const { dataTime, uuidClass, instructorEmail } = input

      // sólo se puede cambiar el instructor
      const res = await prisma.sessions.updateMany({
        where: {
          data_time: dataTime,
          UUID_Class: uuidClass

        },
        data: {
          instructorEmail
        }
      })

      console.log(res)
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

    const c = await prisma.class.findUnique({
      where: {
        UUID_Class: uuidClass
      }
    })

    if (c.instructorEmail !== userEmail) throw new Error('Unauthorized')

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
