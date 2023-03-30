import express from 'express'

const router = express.Router()

// GET /api/v1/posts
router.get('/', (req, res) => {
  res.status(200).send('Hello from the posts route!')
})

export default router
