/* eslint-disable camelcase */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class SessionsClientsModel {
  static getSessionClients = async ({ UUIDClass, date }) => {
    try {
      const data_time = new Date(date)
      console.log(data_time)
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
}
