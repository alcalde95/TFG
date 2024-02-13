import { Router } from 'express'
import { UserController } from '../controllers/users.js'
export const usersRouter = Router()

usersRouter.get('/', UserController.getAll)

usersRouter.get('/login', UserController.login)

usersRouter.post('/register', UserController.login)

usersRouter.get('/:id', UserController.findById)
