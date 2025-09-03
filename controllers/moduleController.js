const db = require('../config/db');


exports.getAllModule = async(req ,res) => {
    try{
        const [result] = await db.query('select * from modules')
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.getModuleById = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = db.query('select * from modules where id=?' ,[id])
        return res.status(200).json(result)
    }   
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.createModule = async(req ,res) => {
    try{
        const {name} = req.body
        if(!name){ return res.status(400).json({error:'Fields required'}) }
        const [result] = await db.query('insert into modules(name) values(?)' ,[name])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}




exports.updateModule = async(req ,res) => {
    try{
        const {id} = req.params
        const {name} = req.body
        if(!name){ return res.status(400).json({error:'Fields required'}) }
        const [result] = await db.query('update modules set name=? where id=?' ,[name ,id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}


exports.deleteModule = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = await db.query('delete from moduels where id=?',[id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}