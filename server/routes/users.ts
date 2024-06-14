import express from 'express'
import * as db from '../db/functions/users.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()

// // GET /api/v1/users
// router.get('/', (req, res) => {
//   res.status(200).send('Hello from the users route!')
// })

// POST /api/v1/users
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(401)
    return
  }
  try {
    const result = await db.addUser(req.body.userData)
    const id = result.id
    if (id !== -1) {
      const url = `/api/v1/users/${id}`
      res.setHeader('Location', url)
      res.status(201).json({ location: url })
    } else {
      res.status(200).json({ status: 409, errorMessage: 'duplicate username' }) //CONFLICT
    }
  } catch (error) {
    console.error(`Error posting userdata:`, error)
    res.sendStatus(500)
  }
})

//Check user exists
// GET /api/v1/users
router.get('/checkRegistered', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(401)
    return
  }
  const authId = req.auth?.sub
  try {
    const userInfo = await db.getUserByAuthId(authId)
    res.status(200).json({ user: userInfo })
  } catch (error) {
    console.error(`Error checking user via authid:`, error)
    res.sendStatus(500)
  }
})

router.patch('/', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(401)
    return
  }
  try {
    await db.editUser(req.body.user)
    res.sendStatus(204)
  } catch (error) {
    console.error(`Error editing user: ${error}`)
    res.sendStatus(500)
  }
})

export default router
