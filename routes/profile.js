require('dotenv').config()

const express = require('express')
const router = express.Router()
const db = require('../database/db.js')


router.get('/profile' , (req , res) =>{
  const user = req.user
  // console.log(user.email)
  const sql = 'SELECT * FROM users WHERE email = ?'
  db.query(sql , [user.email] , (error , result) =>  {
    if (error) {
      // console.log(error)
    }
    res.json({ message: 'Willkommen auf der geschützten Route!', user: result });
  })
})

router.post('/edited' , (req , res) =>{
  try {
    const updatedData = req.body
    if (!updatedData) {
      return res.status(404).json({status: '404' , message: 'Daten nicht gefunden'})
    }
    if (typeof updatedData !== 'object') {
      return res.status(400).json({status: '400' , message: 'Ungültige Angaben'})
    }
    const {id , first_name , last_name , location} = updatedData
    const sql = 'UPDATE users SET first_name = ? , last_name = ? , location = ? WHERE id = ?;'
    db.query(sql , [first_name , last_name , location , id] , (error , result) => {
      if (error) {
      // console.error(err)
      return res.status(500).json({ message: 'Databasefehler beim Aktualisieren' });
    }
    // console.log(result)
    res.status(200).json({ message: 'Benutzer erfolgreich aktualisiert' });
    })
  } catch (error) {
    res.status(500).json({status: '500' ,message: 'Interner Serverfehler ist aufgetreten'})
  }
})
module.exports = router
