/*
mport { generateToken } from '../../utilFunctions.js'
import bcrypt from 'bcrypt'
*/
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export class ClassesModel {
  static getClasses = async () => {
    try {
      const classes = await prisma.class.findMany()
      return classes
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
