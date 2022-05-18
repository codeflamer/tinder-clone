

const checkMatches =async(req, res) =>{
    try{
        const query = `
            *[_type == "users" && _id =="${req.body.likedUser}"]{
                likes
            }
        `
        const isMatch = false;
        const response = await client.fetch(query);
        response[0].likes.forEach(likedUser => {
            if(likedUser._ref === req.body.currentUser){
                isMatch = true
            }
        })
        res.status(200).send({message:'success', data:isMatch});
    }
    catch(err){
        res.status(500).send({ message: 'error', data: error.message })
    }
}


export default checkMatches