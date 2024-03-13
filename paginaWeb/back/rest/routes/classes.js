import { Router } from 'express'
import { ClassesController } from '../controllers/classes.js'
export const classesRouter = Router()

classesRouter.get('/', ClassesController.getClasses)
classesRouter.get('/instructor/', ClassesController.getClassesInstructor)
classesRouter.get('/:classId', ClassesController.getClass)

classesRouter.post('/', ClassesController.createClass)

// classesRouter.delete('/:class_id', ClassesController.deleteClass)
