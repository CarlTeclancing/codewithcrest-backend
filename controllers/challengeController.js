const db = require('../config/db');


exports.getAllChallenge = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM challenges');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getChallengeById = async (req, res) => {
  try {
    const {id} = req.params
    const [rows] = await db.query('SELECT * FROM challenges where id=?' ,[id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createChallenge = async (req, res) => {
  try {
    const {title ,description ,difficulty, status} = req.body
    if(!title || !description || !difficulty || !status){
        return res.status(400).json({error:'All fields required'})    
    }
    const [rows] = await db.query('insert into challenges (title ,description, difficulty, status, created_at, created_by) values(?,?,?,?,?,?)' ,[title ,description ,difficulty, status, Date.now() ,req.user]);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateChallenge = async (req ,res) => {
    try{
    const {title ,description ,difficulty, status} = req.body
    if(!title || !description || !difficulty || !status){
        return res.status(400).json({error:'All fields required'})    
    }

    const [rows] = await db.query('update challenges set title=? ,description=?, difficulty=?, status=?' ,[title ,description ,difficulty, status]);

    res.status(200).json(rows);

    }
    catch(e){
        return res.status(500).json({error:e.message})
    }
}


exports.deleteChallenge = async (req ,res) => {
    try{
    const {id} = req.params

    const [rows] = await db.query('delete from challenges where id=?' ,[id]);

    res.status(200).json(rows);
    }
    catch(e){
        return res.status(500).json({error:e.message})
    }
}