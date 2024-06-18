import express from 'express'
import cors from 'cors'
import { usersRouter } from './rest/routes/users.js'
import { classesRouter } from './rest/routes/classes.js'
import { sessionsRouter } from './rest/routes/sessions.js'
import { sessionsClientsRouter } from './rest/routes/sessions_clients.js'

export const SECRET = process.env.SECRET ?? 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzgxODYzMiwiaWF0IjoxNzA3ODE4NjMyfQ.UNs4JsOz4joWR-VYjo8HEmS0zYyTCEmGWU4-6WAMIWA'

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use(express.json())

app.use(cors())

app.use('/users', usersRouter)
app.use('/classes', classesRouter)
app.use('/sessions', sessionsRouter)
app.use('/sessionsClients', sessionsClientsRouter)


app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
