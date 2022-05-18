import { client } from "../../lib/sanity";

const createUserOnSanity = async(req,res) =>{
    // console.log(req.body.userWalletAddress);
    // console.log(req.body.name);
    // console.log(client);
    try{
        const userDoc = {
            _type:"users",
            _id:req.body.userWalletAddress,
            name:req.body.name,
            walletAddress:req.body.userWalletAddress
        }
        // console.log(userDoc);
        await client.createIfNotExists(userDoc);
        res.status(200).send({message:'success'});
    }
    catch(err){ 
        res.status(500).send({message: "error",data: err.message});
    }
}

export default createUserOnSanity;