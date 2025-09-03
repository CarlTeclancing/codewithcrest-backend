const db = require('../config/db');


exports.getAllUserChallenge = async(req ,res) => {
    try{
        const [result] = await db.query('select * from user_challenges');
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.getUserChallengeById = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = await db.query('select * from user_challenges where id=?' ,[id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.createUserChallenge = async(req ,res) => {
    try{
        const {user_id, challenge_id, code, link} = req.body
        if(!user_id || !challenge_id || !code || !link){
            return res.status(400).json({error:'All fields required'})
        }
        const [result] = await db.query('insert into user_challenges(user_id , challenge_id, code, link ,status ,createdAt) values(? ,? ,? ,? ,?)' ,[user_id, challenge_id, code, link ,'pending', Date.now()])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}




exports.updateUserChallenge = async(req ,res) => {
    try{
        const {id} = req.params
        const {code, link ,status} = req.body
        if( !code || !link){
            return res.status(400).json({error:'All fields required'})
        }
        const [result] = await db.query('update user_challenges set code=? ,link=?, status=? where id=?' ,[code ,link, status ,id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}


exports.deleteUserChallenge = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = await db.query('delete from user_challenges where id=?' ,[id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}