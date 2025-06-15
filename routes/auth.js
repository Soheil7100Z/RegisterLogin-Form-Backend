require('dotenv').config()

const express = require('express')
const router = express.Router()
const db = require('../database/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register' , async (req , res) => {
  try {
  const registerData = req.body
  // console.log(registerData)
  if (!registerData) {
    return res.status(404).json({status: '404' , message: 'Daten nicht gefunden'})
  }
  if (typeof registerData !== 'object') {
    return res.status(400).json({status: '400' , message: 'Ungültige Angaben'})
  }
  const {first_name , last_name , email , password , location } = registerData
  const sqlemailCheck = 'SELECT * FROM users WHERE email = ?'
  db.query(sqlemailCheck , [email] , async (error , result) => {
    if (result.length !== 0) {
      return res.status(409).json({ message: 'Diese E-Mail ist bereits registriert' });
    }
    const hasshedPassword = await bcrypt.hash(password , 10)
    const sql = 'INSERT INTO users (first_name , last_name , email , password , location) VALUES (?,?,?,?,?)'
    db.query(sql , [first_name , last_name , email , hasshedPassword , location] , (err , result) =>{
      if (err) {
      // console.error(err);
      return res.status(500).json({ message: 'Interne Databasefehler ist aufgetreten'})
      }
      // console.log(result)

      res.status(201).json({ message: 'Sie haben erfolgreich registrieret!'})
    })
  })
    // res.status(200).json({status: '200' , message: 'Sie haben erfolgreich registrieret!'})
    } catch (error) {
      // console.log(error)
    res.status(500).json({status: '500' ,message: 'Interner Serverfehler ist aufgetreten'})
  }
})

router.post('/login' , (req , res) => {
  try {
    const loginData = req.body
    // console.log(loginData)
    if (!loginData) {
      return res.status(404).json({status: '404' , message: 'Daten nicht gefunden'})
    }
    if (typeof loginData !== 'object') {
      return res.status(400).json({status: '400' , message: 'Ungültige Angaben'})
    }
    const {email , password} = loginData
    const sql = 'SELECT * FROM users WHERE email = ?'
    db.query(sql , [email] , async (error , result) => {
      if (error) {
        // console.log(error)
        return res.status(500).json({status: '500' ,message: 'Interner Datenbankfehler'})
      }
      const users = result
      // console.log(users)
      if (users.length === 0) {
        return res.status(404).json({ message: 'E-Mail ist nicht registriert' });
      }
      const user = users[0]
      const passwordMatch = await bcrypt.compare(password , user.password)
      if (!passwordMatch) {
        return res.status(401).json({status: '401' , message: 'Sie haben falsches Passwort eingegeben'})
      }
      const token = jwt.sign(
        {id: user.id , email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '24h'}
      )
      res.status(200).json({message: 'successfull login' , token})

    })

  } catch (error) {
    res.status(500).json({status: '500' ,message: 'Interner Serverfehler ist aufgetreten'})
  }
})

module.exports = router
