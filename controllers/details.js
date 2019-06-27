const detailsHandler=(req,res,dob)=>{
	const { id }= req.params;
	dob.select('*').from('users')
	.where({
		id:id
	})
	.returning('*')
	.then(user=>{
		res.json(user[0])
	})

	
}
module.exports={
	detailsHandler:detailsHandler
}