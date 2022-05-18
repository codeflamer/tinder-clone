
const safeLike = async(req,res) =>{
    try{
        await client
        .patch(req.body.currentUser)
        .setIfMissing({likes:[]})
        .insert('after','likes[-1]',[
            {
                _key:`${req.body.likedUser} - ${req.body.currentUser}`,
                _type: 'reference',
                _ref: req.body.likedUser
            }
        ])
        .commit();
    }
    catch(error){
        res.status(500).send({ message: 'error', data: error.message })
    }
}

export default safeLike;