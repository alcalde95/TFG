import { Router } from 'express'
import { UserController } from '../controllers/users.js'
export const usersRouter = Router()

usersRouter.get('/', UserController.getUsers)
usersRouter.get('/all', UserController.getAllUsers)
usersRouter.get('/instructors/', UserController.getAllInstructors)

usersRouter.post('/login', UserController.login)
usersRouter.post('/', UserController.register)

usersRouter.put('/', UserController.updateUser)

usersRouter.delete('/:email', UserController.deleteUser)
