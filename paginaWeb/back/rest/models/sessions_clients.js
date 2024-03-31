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
}
