const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 3300;

app.use(express.json())

app.use(cors({
    origin: [
      'http://localhost:5300',
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }));

app.get('/' , (req , res) => {
  res.send('login server is working')
})

app.listen(PORT , () => console.log(`server is on ${PORT}`))
