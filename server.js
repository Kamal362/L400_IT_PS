require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const { render } = require('ejs')

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

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


// registration route
app.get('/register', (req, res, next)=>{
  res.render('register', {
    login: 'login', 
    error: "",
    message: ""
   })
})

// add user route
app.post('/register', (req, res, next)=>{
  students.push({
    id: Math.random(),
    username: req.body.username,
    index_numaber: req.body.index_number,
    password: req.body.password
  })
  res.render('login', {
    login: 'login', 
    register: 'register',
    message: "Registration successful, kindly login ✅",
    error: ""
   })
   console.log(students)
})

// add success route
app.get('/success', (req, res, next)=>{
   res.render('success',{
       name: req.body.username,
       login: 'login'
   })
})


// login route
app.get('/login', (req, res, next)=>{
  res.render('login', {
    login: 'login',
    register: 'register',
    error: "",
    message: ""
  })
  next()
})

// login verification
app.post('/login', (req, res, next) => {
  students.find( student => {
    if(student.username === req.body.username && student.password === req.body.password){
      console.log(student)
      return res.render('success', {
         name: student.username,
         login: 'login'
      })  
    }
  })
  if(!students.includes(req.body.username)){
    return res.render('login', {
    login: 'login', 
    register: 'register',
    message: "",
    error: "User not found! please register ⛔️"
  })
}
  next()
})

// app listening to port 3000 
app.listen(3000, (err, res) => {
   if(err)
     console.log(err)
   console.log('app listening to port 3000 ...')  

// // query student route
// app.post('/login', (req, res, next)=>{
//   const user = students.find(user => user.username)
//   console.log(user)
//   try{
//     if(user.username === null ){ 
//        res.render('login', { 
//       register: 'register',
//       login: 'login',
//       message: "",
//       error: 'user not found'
//       })
//     }
//     if(req.body.password === user.password){
//       res.render('success', { 
//         register: 'register',
//         login: 'login',
//         error: 'user not found',
//         message: "",
//         name : req.body.username
//       })
//      }else{
//       res.render('login', { 
//         register: 'register',
//         login: 'login',
//         message: "",
//         error: 'password mismatch!!'
//     })
//    }
//   }catch(e) {
//       res.render('login', { 
//         register: 'register',
//         login: 'login',
//         message: "",
//         error:  `Not successful: ${e.message}`
//     })
//    }
// })


// // authentication route
// app.get('/student', authenticateToken, (req, res) => {
//   res.json(students.filter(student => student.username === req.user.name))
// })

// // middleware for getting students details authenticated
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization']
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null)
//      return res.render('login',{
//       register: 'register',
//       login: 'login',
//       message: "",
//       error:  `Not successful: ${e.message}`
//   })

//   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//     console.log(err)
//     if (err)
//     return res.render('login',{
//       register: 'register',
//       login: 'login',
//       message: "",
//       error:  `Not successful: ${e.message}`
//   })
//     req.user = user
//     next()
//   })
// } 

})