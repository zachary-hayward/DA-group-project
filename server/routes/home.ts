import express from 'express'

const router = express.Router()

// GET /api/v1/home
router.get('/', (req, res) => {
  res.status(200).send('Hello from the home route!')
})

export default router
