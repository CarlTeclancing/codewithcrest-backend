const db = require('../config/db');


exports.getAllProfile = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM profiles');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const {id} = req.params
    const [rows] = await db.query('SELECT * FROM profiles where id=?' ,[id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const {user_id} = req.params
    const [rows] = await db.query('SELECT * FROM profiles where user_id=?' ,[user_id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createProfile = async (req, res) => {
  try {
    const { name ,bio ,location ,github, linkedin ,userId } = req.body

    if(!userId || !name || !bio || !location || !github || !linkedin){
        return res.status(400).json({error:'All fields required'})
    }

    const [rows] = await db.query('insert into profiles(user_id, name ,bio,location, github_link ,linkedin_link) values(? ,? ,? ,?, ?,?) ' ,[userId ,name ,bio ,location ,github ,linkedin]);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
    try {
        const {id} = req.params
        const { name ,bio ,location ,github, linkedin ,userId } = req.body
    
        if(!userId || !name || !bio || !location || !github || !linkedin){
            return res.status(400).json({error:'All fields required'})
        }
    
        const [respond] = await db.query("update profiles set name=?, bio=?, location=? ,github_link=?, linked_link" ,[name ,bio ,location ,github ,linkedin])
        return res.status(200).json(respond)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

