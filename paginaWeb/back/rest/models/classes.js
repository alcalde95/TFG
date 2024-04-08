import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import { convertClassesPhoto, convertSingleClassesPhoto } from '../../utilFunctions.js'

const prisma = new PrismaClient()

export class ClassesModel {
  static getClasses = async ({ name, maxCapacity, minDuration, maxDuration }) => {
    try {
      const classes = await prisma.class.findMany({
        where: {
          name: {
            contains: name
          },
          max_Capacity: {
            lte: maxCapacity
          },
          duration: {
            gte: minDuration,
            lte: maxDuration
          }
        }
      })
      return convertClassesPhoto({ classes })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static getClass = async ({ classId }) => {
    try {
      const classData = await prisma.class.findUnique({
        where: {
          UUID_Class: classId
        }
      })
      return convertSingleClassesPhoto({ c: classData })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static getClassesInstructor = async ({ instructorEmail }) => {
    try {
      const classesData = await prisma.class.findMany({
        where: {
          instructorEmail
        }
      })
      return convertClassesPhoto({ classes: classesData })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static getManagedClassesInstructor = async ({ instructorEmail }) => {
    try {
      const classesData = await prisma.class.findMany({
        where: {
          session: {
            some: {
              instructorEmail
            }
          }
        }
      })

      return convertClassesPhoto({ classes: classesData })
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static create = async ({ input }) => {
    const { name, photo, description, maxCapacity, duration, instructorEmail } = input
    const UUIDClass = uuidv4()
    try {
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
  }

  static updateClass = async ({ input }) => {
    const { UUIDClass, name, photo, description, maxCapacity, duration, instructorEmail } = input
    try {
      await prisma.class.update({
        where: {
          UUID_Class: UUIDClass
        },
        data: {
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
  }

  static deleteClass = async ({ uuidClass, instructorEmail }) => {
    try {
      const c = await prisma.class.findUnique({
        where: {
          UUID_Class: uuidClass
        }
      })
      if (!c) throw new Error('Class not found')
      if (c.instructorEmail !== instructorEmail) return new Error('Unauthorized')

      await prisma.class.delete({
        where: {
          UUID_Class: uuidClass
        }
      })
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
