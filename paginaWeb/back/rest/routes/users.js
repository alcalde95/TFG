import { Router } from 'express'
import { UserController } from '../controllers/users.js'
export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.post('/login', UserController.login)

usersRouter.post('/register', UserController.register)

usersRouter.get('/:id', UserController.findById)
