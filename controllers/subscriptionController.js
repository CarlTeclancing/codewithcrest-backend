const db = require('../config/db');


exports.getAllSubscription = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM subscriptions');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getSubscriptionById = async (req, res) => {
  try {
    const {id} = req.params
    const [rows] = await db.query('SELECT * FROM subscriptions where id=?' ,[id]);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.getUserSubscription = async (req, res) => {
  try {
    const {userId} = req.params
    const [rows] = await db.query('SELECT * FROM subscriptions where user_id=?' ,userId);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.makeSubscription = async (req, res) => {
  try {
    const {title ,amount ,number} = req.body
    if(!title || !amount || !number){
        return res.status(400).json({error:'All fields required'})
    }

    // payment initiation

    const [result] = await db.query('insert into subscriptions (title ,amount, payment_status, date) values(?,?,?,?) ', [title ,amount, 'pending', Date.now()])

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};