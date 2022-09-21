require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.use(express.json())

let id 
const students = [
  {
    id: 0.029075364612826782,
    username: 'Samson',
    index_number: 'PS/ITC/18/0001',
    password: 'Aboagye124'
  },
  {
    id: 0.9626443794717934,
    username: 'Angela',
    index_number: 'PS/ITC/18/0011',
    password: 'Angela1234'
  }
]

// get all students
app.get('/all', (req, res, next)=>{
  res.json(students)
  next()
})

// add students route
app.post('/all', (req, res)=>{
  students.push({
    id: Math.random(),
    username: req.body.username,
    index_numaber: req.body.index_number,
    password: req.body.password
  })
  res.json({
    status: 200,
    message: req.body.username + ' successfully added '
 })
})


// query student route
app.post('/login', (req, res, next)=>{
  const user = students.find(user => user.username)
  console.log(user)
  if(user.username === null ){ 
    res.json({
      username: user.username,
      status: 404, 
      message: `user not found`})
    }
  try{
    if(req.body.password === user.password){
      res.json({
          username: user.username,
          message: 'login successful'
      })
     }else{
       res.json({
          status: 403,
          message: `password mismatch!!`
    })
   }
  }catch(e) {
      res.json({
          status: 404,
          message: `Not successful: ${e.message}`
  })
   }
})


// authentication route
app.get('/student', authenticateToken, (req, res) => {
  res.json(students.filter(student => student.username === req.user.name))
})

// middleware for getting students details authenticated
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null)
     return res.json({
     status: 401,
     message: 'token not found!'  
  })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err)
    if (err)
    return res.json({
    status: 403,
    message: 'Error occured:' + err.message 
    })
    req.user = user
    next()
  })
} 



// app listening to port 3000
app.listen(5000, (err, res) => {
   if(err)
     console.log(err)
   console.log('app listening to port 5000 ...')  
})