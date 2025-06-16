const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT || 3300;
const authRouter = require('./routes/auth.js')
const profileRouter = require('./routes/profile.js')
const authMiddleware = require('./middleware/authMiddleware.js')

app.use(express.json())

app.use(cors({
    origin: [
      'http://localhost:5300',
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }));

app.use('/' , authRouter)
app.use('/protected' , authMiddleware , profileRouter)
app.use('/' , profileRouter)
app.get('/' , (req , res) => {
  res.send('login server is working')
})

app.listen(PORT , () => console.log(`server is on ${PORT}`))
