const express = require('express')

const port = 3000
const app = express()

app.get('/', (req, res) => {
  res.send('test!')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})