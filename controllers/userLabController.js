const db = require('../config/db');


exports.getAllUserLab = async(req ,res) => {
    try{
        const [result] = await db.query('select * from user_labs');
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.getUserLabById = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = await db.query('select * from user_labs where id=?' ,[id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.createUserLab = async(req ,res) => {
    try{
        const {user_id, lab_id, code} = req.body
        if(!user_id || !lab_id || !code ){
            return res.status(400).json({error:'All fields required'})
        }
        const [result] = await db.query('insert into user_labs(user_id , lab_id, code ,createdAt) values(? ,? ,? ,? )' ,[user_id, lab_id, code,  Date.now()])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}




exports.updateUserLab = async(req ,res) => {
    try{
        const {id} = req.params
        const {code} = req.body
        if( !code ){
            return res.status(400).json({error:'All fields required'})
        }
        const [result] = await db.query('update user_labs set code=?  where id=?' ,[code ,id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}


exports.deleteUserLab = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = await db.query('delete from user_labs where id=?' ,[id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}