const db = require('../config/db');


exports.getAllPost = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM community_post');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const {id} = req.params
    const [rows] = await db.query('SELECT * FROM community_post where id=?' ,[id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createPost = async (req, res) => {
  try {
    const {title, content } = req.body

    if(!title || !content){
        return res.status(400).json({error:'All fields required'})
    }

    const [rows] = await db.query('insert into community_post(title, content, date) values(? ,? ,?) ' ,[title ,content ,Date.now()]);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePost = async (req, res) => {
    try {
    const {id} = req.params
    const {title, content } = req.body

    if(!title || !content){
        return res.status(400).json({error:'All fields required'})
    }
        const [respond] = await db.query("update community_post set title=? ,content=? where id=?" ,[title ,content, id])
        return res.status(200).json(respond)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deletePost = async (req, res) => {
    try {
    const {id} = req.params

        const [respond] = await db.query("delete from community_post where id=?" ,[id])
        return res.status(200).json(respond)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
