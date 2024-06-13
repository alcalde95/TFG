import { Router } from 'express'
import { UserController } from '../controllers/users.js'
export const usersRouter = Router()

usersRouter.get('/', UserController.getUsers)
usersRouter.get('/all', UserController.getAllUsers)
usersRouter.get('/instructors/', UserController.getAllInstructors)
usersRouter.get('/clients/', UserController.getClients)
usersRouter.get('/clients/validation', UserController.isValidatedClient)

usersRouter.post('/', UserController.createUser)
usersRouter.post('/login', UserController.login)
usersRouter.post('/clients/', UserController.register)

usersRouter.put('/', UserController.updateUser)
usersRouter.put('/clients/', UserController.updateClient)

usersRouter.delete('/:email', UserController.deleteUser)
