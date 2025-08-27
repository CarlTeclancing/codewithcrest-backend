const db = require('../config/db');


exports.getAllLab = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM labs');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLabById = async (req, res) => {
  try {
    const {id} = req.params
    const [rows] = await db.query('SELECT * FROM labs where id=?' ,[id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLabByUserId = async (req, res) => {
  try {
    const {userId} = req.params
    const [rows] = await db.query('SELECT * FROM labs where user_id=?' ,[userId]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createLab = async (req, res) => {
  try {
    const {title, code } = req.body

    if(!title || !code){
        return res.status(400).json({error:'All fields required'})
    }

    const [rows] = await db.query('insert into labs(user_id ,title, code, date) values(? ,? ,?) ' ,[req.user,title ,code ,Date.now()]);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLab = async (req, res) => {
    try {
    const {id} = req.params
    const {title, code ,status } = req.body

    if(!title || !code){
        return res.status(400).json({error:'All fields required'})
    }
        const [respond] = await db.query("update labs set title=? ,code=? ,status=? where id=?" ,[title ,code ,status, id])
        return res.status(200).json(respond)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deleteLab = async (req, res) => {
    try {
    const {id} = req.params

        const [respond] = await db.query("delete from labs where id=?" ,[id])
        return res.status(200).json(respond)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
