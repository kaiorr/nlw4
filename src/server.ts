import express from 'express'

const app = express()

app.get('/users', (request, response) => {
  return response.json({message: "Oi"})
})

app.listen(9999, () => console.log('Server is running!'));
