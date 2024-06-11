import express from 'express'
import * as db from '../db/functions/groups.ts'
const router = express.Router()

// GET /api/v1/groups
router.get('/', async (req, res, next) => {
  try {
    const groups = await db.getAllGroups()
    res.json(groups)
    res.status(200).send('Hello from the groups route!')
  } catch (e) {
    next(e)
  }
})

export default router
