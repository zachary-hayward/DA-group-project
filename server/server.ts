import express from 'express'
import { join } from 'node:path'

import homeRoutes from './routes/home'
import usersRoutes from './routes/users'
import postsRoutes from './routes/posts'
import groupsRoutes from './routes/groups'

const server = express()

server.use(express.json())
server.use(express.static(join(__dirname, 'public')))

server.use('/api/v1/home', homeRoutes)
server.use('/api/v1/users', usersRoutes)
server.use('/api/v1/posts', postsRoutes)
server.use('/api/v1/groups', groupsRoutes)

server.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'public', 'index.html'))
})

export default server
