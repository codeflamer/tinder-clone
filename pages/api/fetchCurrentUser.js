import { client } from "../../lib/sanity"



const getUserInfo = async(req, res) =>{
    // console.log(req.query.activeAccount);
    try{
        const query = `
            *[_type == "users" && _id == "${req.query.activeAccount}"]{
                name,
                walletAddress,
                "imageUrl":profileImage.asset -> url
            }
        `
        const response = await client.fetch(query)
        res.status(200).send({message:'success',data:response[0]});
    }
    catch(err){
        res.status(500).send({message:'error',data:err.message})
    }
}

export default getUserInfo;