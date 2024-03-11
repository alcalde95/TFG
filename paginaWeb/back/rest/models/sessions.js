import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export class SessionsModel {
  static getSessions = async ({ classId }) => {
    try {
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

  /* static getClass = async ({ classId }) => {
    try {
      const classData = await prisma.class.findUnique({
        where: {
          UUID_Class: classId
        }
      })
      return classData
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static create = async ({ input }) => {
    const { name, photo, description, maxCapacity, duration, instructorEmail } = input
    const UUIDClass = uuidv4()
    try {
      console.log(name, photo, description, maxCapacity, duration, instructorEmail, UUIDClass)

      await prisma.class.create({
        data: {
          UUID_Class: UUIDClass,
          name,
          photo,
          description,
          max_Capacity: maxCapacity,
          duration,
          instructorEmail
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  } */
}
