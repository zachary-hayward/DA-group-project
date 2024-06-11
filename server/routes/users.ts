import express from 'express'
import * as db from '../db/functions/users.ts'
import checkJwt, { JwtRequest } from '../auth0.ts'

const router = express.Router()

// GET /api/v1/posts
router.get('/', (req, res) => {
  res.status(200).send('Hello from the users route!')
})

//Check user exists
router.get('/checkauth', checkJwt, async (req : JwtRequest, res) => {
  //res.json({exists:true})
  const authId = req.auth?.sub
  try {
    const userInfo = await db.getUserByAuthId(authId)
    res.json({user:userInfo})
  } catch(error){
    console.error(`Error checking user via authid:`, error)
    res.sendStatus(500)
  }
})

export default router
