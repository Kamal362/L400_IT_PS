require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const { render } = require('ejs')
const mongoose = require('mongoose')
const Student = require('./models/student')
const port = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())


// connecting to db
mongoose.connect(process.env.DB_URL)
//mongoose.connect(db_url)
.then(app.listen(port, () => console.log(`app listening to port ${port}...`)))
.then((result) => console.log("database successfully connected..."))
.catch((err) => console.log('not able to connect to the database '+ err))

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
  const student = new Student({
    id: Math.random(),
    username: req.body.username,
    index_number: req.body.index_number,
    password: req.body.password
  })
  student.save()
   .then(result => {console.log('User added successfully') })
   .catch(err => { console.log('user not add '+ err) })

  res.render('login', {
    login: 'login', 
    register: 'register',
    message: "Registration successful, kindly login ✅",
    error: ""
   })
   
   console.log(student)
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
app.post('/login', async  (req, res, next) => {
  const query = await Student.findOne({
    username: req.body.username,
    password: req.body.password
  })
        
   console.log(query)
  if(query){
    console.log("User exist..")
    return res.render('success',{
      name: req.body.username,
      login: 'login'       
    })
  }else{
    res.render('login', {
       login: 'login', 
       register: 'register',
       message: "",
       error: "User not found! please register ⛔️"
    })
  }
  next()
})

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
