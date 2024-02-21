import { Router } from 'express'
import { UserController } from '../controllers/users.js'
export const usersRouter = Router()

usersRouter.get('/', UserController.getUsers)
usersRouter.get('/all', UserController.getAllUsers)
usersRouter.get('/:id', UserController.findById)

usersRouter.post('/login', UserController.login)
usersRouter.post('/register', UserController.register)

usersRouter.delete('/:email', UserController.deleteUser)
