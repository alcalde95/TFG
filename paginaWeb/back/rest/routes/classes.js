import { Router } from 'express'
import { ClassesController } from '../controllers/classes.js'
export const classesRouter = Router()

classesRouter.get('/', ClassesController.getClasses)
classesRouter.get('/instructor/', ClassesController.getClassesInstructor)
classesRouter.get('/sessions/', ClassesController.getManagedClassesInstructor)
classesRouter.get('/:classId', ClassesController.getClass)

classesRouter.post('/', ClassesController.createClass)

classesRouter.put('/', ClassesController.updateClass)

classesRouter.delete('/:class_id', ClassesController.deleteClass)
