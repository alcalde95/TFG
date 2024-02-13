import express from 'express'
import path from 'path'
import jwt  from 'jsonwebtoken'

import {usersRouter} from './rest/routes/users.js'

export const SECRET = process.env.SECRET ?? 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcwNzgxODYzMiwiaWF0IjoxNzA3ODE4NjMyfQ.UNs4JsOz4joWR-VYjo8HEmS0zYyTCEmGWU4-6WAMIWA'


const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use(express.json())

app.use('/users', usersRouter)

app.get('/', (req, res) => {
  res.status(200).send('hola :D')
})

app.get('/token', (req, res) => {
  const { user } = { user: 'JaviInUse' }
  const token = jwt.sign({
    user,
    exp: Date.now() + 60 * 60 * 1000
  }, SECRET)
  res.send({ token })
})

app.get('/private', (req, res) => {

  try {
    const { authorization } = req.headers
    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, SECRET)

    if(Date.now() > decoded.exp){
      throw new Error('Token expired')
    }

    res.send(decoded.user = ('JaviInUse') ? 'Welcome' : 'Unauthorized')
  } catch (error) {
    res.status(401).send(error.message)
  }
})


// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})