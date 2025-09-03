const db = require('../config/db');


exports.getAllCourse = async(req ,res) => {
    try{
        const [result] =await db.query('select * from courses');
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.getCourseById = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = await db.query('select * from courses where id=?',[id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}



exports.createCourse = async(req ,res) => {
    try{
        const {name ,moduleId} = req.body
        if(!name || !moduleId){
            return res.status(400).json({error:'All fields required'})
        }
        const [result] = await db.query('insert into courses(name, module_id) values(?, ?)' ,[name ,moduleId])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}




exports.updateCourse = async(req ,res) => {
    try{
        const {id} = req.params
        const {name ,moduleId} = req.body
        if(!name || !moduleId){
            return res.status(400).json({error:'All fields required'})
        }
        const [result] = await db.query('update courses set name=?, module_id=? where id=?' ,[name ,moduleId ,id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}


exports.deleteCourse = async(req ,res) => {
    try{
        const {id} = req.params
        const [result] = await db.query('delete from courses where id=?',[id])
        return res.status(200).json(result)
    }
    catch(e){
        console.log(e);
        return res.status(500).json({error:e.message})
    }
}