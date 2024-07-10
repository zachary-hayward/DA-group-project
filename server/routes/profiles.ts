import express from 'express'
import * as db from '../db/functions/users.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()

//GET /api/v1/profiles/:username
router.get('/:username', checkJwt, async (req: JwtRequest, res) => {
  if (!req.auth?.sub) {
    res.sendStatus(401)
    return
  }

  try {
    const username = req.params.username
    const user = await db.getUserByUsername(username)
    res.status(200).json({ user })
  } catch (error) {
    res.sendStatus(500)
  }
})

export default router
