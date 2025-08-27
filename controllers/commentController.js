const db = require('../config/db');


exports.getAllComment = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM comments');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentByPostId = async (req, res) => {
  try {
    const {postId} = req.params
    const [rows] = await db.query('SELECT * FROM comments where post_id=?' ,[postId]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const {id} = req.params
    const [rows] = await db.query('SELECT * FROM comments where id=?' ,[id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const {text } = req.body

    if(!text){
        return res.status(400).json({error:'All fields required'})
    }

    const [rows] = await db.query('insert into comments(text, date) values(? ,? ) ' ,[text ,Date.now()]);

    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.deleteComment = async (req, res) => {
    try {
    const {id} = req.params

        const [respond] = await db.query("delete from comments where id=?" ,[id])
        return res.status(200).json(respond)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
