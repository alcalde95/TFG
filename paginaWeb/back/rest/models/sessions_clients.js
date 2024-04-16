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

      const nonAssisted = await prisma.sessions_Client.findMany({
        where: {
          client_Email: clientEmail,
          data_time: {
            lt: (new Date()).toISOString()
          },
          attend: false,
          justified: false
        },
        orderBy: {
          data_time: 'desc'
        }
      })
      // preguntar a dani, pq claro, ahí entran ya temas de negocio
      if (nonAssisted.length !== 0 && nonAssisted.length % 3 === 0) {
        if (new Date(nonAssisted[0].data_time) >= new Date((new Date()).getTime() - 1000 * 60 * 60 * 24 * 31)) {
          throw new Error('Sancionado por no asistir a clases')
        }
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
      const c = await prisma.sessions.findUnique({
        where: {
          UUID_Class: input.uuidClass,
          data_time: input.dataTime
        }
      })

      if (c.instructorEmail !== userEmail) throw new Error('Unauthorized')

      const { dataTime, uuidClass, clientEmail, attend, justified } = input

      // sólo se puede cambiar el instructor
      await prisma.sessions_Client.update({
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

      const isEnrolled = await prisma.sessions_Client.findUnique({
        where: {
          data_time: dataTime,
          UUID_Class: uuidClass,
          client_Email: clientEmail
        }
      })
      return isEnrolled !== null
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static unenrollClientToSession = async ({ input }) => {
    try {
      const { dataTime, uuidClass, clientEmail } = input

      await prisma.sessions_Client.delete({
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
