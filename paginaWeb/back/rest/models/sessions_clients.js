/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class SessionsClientsModel {
  static getSessionClients = async ({ UUIDClass, date }) => {
    try {
      const data_time = new Date(date)
      const sessionsClients = await prisma.sessions_Client.findMany(
        {
          where: {
            UUID_Class: UUIDClass,
            data_time
          }
        }
      )
      return { sessionsClients }
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static enrollClientToSession = async ({ input }) => {
    try {
      const { dataTime, uuidClass, clientEmail } = input

      const lowerDateTimeWindow = new Date()
      lowerDateTimeWindow.setDate(lowerDateTimeWindow.getDate() - 31 * 3)

      const nonAssisted = await prisma.sessions_Client.findMany({
        where: {
          client_Email: clientEmail,
          data_time: {
            lt: (new Date()).toISOString(),
            gt: lowerDateTimeWindow.toISOString()
          },
          attend: false,
          justified: false
        },
        orderBy: {
          data_time: 'desc'
        }
      })
      if (nonAssisted.length >= 3) {
        console.log(nonAssisted)
        const sanctionedUntilDate = new Date(nonAssisted[0].data_time)
        sanctionedUntilDate.setDate(sanctionedUntilDate.getDate() + 31)
        console.log(sanctionedUntilDate)
        if (sanctionedUntilDate > new Date()) throw new Error('Client is sanctioned')
      }

      await prisma.sessions_Client.create({
        data: {
          data_time: dataTime,
          UUID_Class: uuidClass,
          client_Email: clientEmail,
          attend: false,
          justified: false
        }

      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static updateSessionClients = async ({ input, userEmail }) => {
    try {
      const c = await prisma.sessions.findMany({
        where: {
          UUID_Class: input.uuidClass,
          data_time: input.dataTime
        }
      })

      if (c[0].instructorEmail !== userEmail) throw new Error('Unauthorized')

      const { dataTime, uuidClass, clientEmail, attend, justified } = input

      // sólo se puede cambiar el instructor
      await prisma.sessions_Client.updateMany({
        where: {
          data_time: dataTime,
          UUID_Class: uuidClass,
          client_Email: clientEmail
        },
        data: {
          attend,
          justified
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static isEnrolled = async ({ input }) => {
    try {
      const { dataTime, uuidClass, clientEmail } = input
      console.log(dataTime, uuidClass, clientEmail)
      const isEnrolled = await prisma.sessions_Client.findMany({
        where: {
          data_time: dataTime,
          UUID_Class: uuidClass,
          client_Email: clientEmail
        }
      })
      return isEnrolled.length !== 0
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static unenrollClientToSession = async ({ input }) => {
    try {
      const { dataTime, uuidClass, clientEmail } = input

      await prisma.sessions_Client.deleteMany({
        where: {
          data_time: dataTime,
          UUID_Class: uuidClass,
          client_Email: clientEmail
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
