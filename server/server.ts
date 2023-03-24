import express from 'express'
import { join } from 'node:path'

// const homeRoutes = require('./routes/home')

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

// server.use('/api/v1/home', homeRoutes)

// do we need this?
server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

export default server
