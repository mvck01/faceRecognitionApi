const registerHandler=(req,res,dob,bcrypt)=>{
	const {name, password,email}= req.body;
	const hash = bcrypt.hashSync(password);
	dob.transaction(trx=>{
		trx.insert({
			email:email,
			hash: hash
		})
			.into('login')
			.returning('email')
			.then(loginEmail=>{
				return trx('users')
				.returning('*')
				.insert({
					email:loginEmail[0],
					name:name,
					joined: new Date()
				}).then(user=>res.json(user[0]))

			})
				.then(trx.commit)
				.catch(trx.rollback)
	})
		.catch(err=>res.json('unable to register'))

}
module.exports={
	registerHandler:registerHandler
}