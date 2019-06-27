const rankHandler=(req,res,dob)=>{
	const { id } = req.body
	dob.select('*').from('users')
	.where({
		id:id
	})
		.increment('entries', 1)
		.returning('entries')
		.then(entry=>{
			res.json(entry)
		})
	
}
module.exports={
	rankHandler:rankHandler
}