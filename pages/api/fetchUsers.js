
import { client } from "../../lib/sanity"

const getUsersInfo = async(req, res) =>{
    // console.log(req.query.activeAccount);
    try{
        const query = `
            *[_type == "users" && _id != "${req.query.activeAccount}"]{
                name,
                walletAddress,
                "imageUrl":profileImage.asset -> url
            }
        `
        
        const response = await client.fetch(query)
        res.status(200).send({message:'success',data:response});
    }
    catch(err){
        res.status(500).send({message:'error',data:err.message})
    }
}

export default getUsersInfo