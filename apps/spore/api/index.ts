import express, { Request, Response } from 'express'

const app = express()
const port = process.env.PORT || 8081

app.get('/api', (_req: Request, res: Response) => {
  return res.send('Hello')
})

app.get('/api/ping', (_req: Request, res: Response) => {
  return res.send('pong 🏓')
})

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`)
})

export default app

