const express = require('express')
const app = express()

app.get('/api', (req, res, next) => {
  res.send('React Chat API')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`App running on port ${PORT}`))
