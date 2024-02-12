const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')


app.get('/', (req, res) => {
  res.status(200).send('hola :D')
})

app.get('/1', (req, res) => {
    res.status(200).send('hola caracola')
  })
// la última a la que va a llegar
app.use((req, res) => {
  res.status(404).send('<h1>404</h1>')
})

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})