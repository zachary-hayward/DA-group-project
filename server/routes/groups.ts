import express from 'express'

const router = express.Router()

// GET /api/v1/groups
router.get('/', (req, res) => {
  res.status(200).send('Hello from the groups route!')
})

export default router
