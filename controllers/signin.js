const signinHandler= (req,res,dob,bcrypt)=>{
	const {email, password}= req.body 
	dob.select('*').from('login')
	.where({
		email:email
	})
		.then(info=>{
			const convert=bcrypt.compareSync(password, info[0].hash)
			if(convert){
				dob.select('*').from('users')
				.where({
					email:email
				})
					.then(user=>{
						res.json(user[0])
					})
					.catch(err=>res.status(400).json('Confam Credentials'))
			}
		}).catch(err=>res.status(400).json('Not in Dbase'))
}

module.exports={
	signinHandler:signinHandler
}