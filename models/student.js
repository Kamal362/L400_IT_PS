const mongoose = require('mongoose')
const Schema = mongoose.Schema

// ceating our schema and model
//NB: schema allows us to defind the structure of a db
// while models all us to access the content

// create schema
const studentSchema = new Schema({
    username:{
       type: String,
       required: true
    },
    index_number:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true});

// create model
const Student = mongoose.model('student', studentSchema)

module.exports = Student;
