const express= require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcryptjs');

const signin= require('./controllers/signin')
const register= require('./controllers/register')
const details= require('./controllers/details')
const rank= require('./controllers/rank')


const dob = knex({
	client: 'pg',
  	connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'SlipperY',
    database : 'testdb'
  }
})

app.use(bodyParser.json())
app.use(cors())


app.get('/',(req,res)=>{
	dob.select('*').from('users')
	.then(users=> res.json(users))
})

app.post('/signin', (req,res)=>{signin.signinHandler(req,res,dob,bcrypt)} )

app.post('/register',(req,res)=>{register.registerHandler(req,res,dob,bcrypt)})

app.get('/details/:id', (req,res)=>{details.detailsHandler(req,res,dob)})

app.put('/rank', (req,res)=>{rank.rankHandler(req,res,dob)})

app.listen(3001)