const bcrypt = require('bcryptjs');
const db = require('../config/db');
const generateToken = require('../utils/generateToken');


// User Signup
exports.register = async (req, res) => {
  const { email, password, number ,role } = req.body;
  if((!email || !password )&& (!number || !password) ){
    return res.status(401).json({error:'All fields required'})
  }

  try {
    // Check if user exists
    const [user] = await db.execute(
      'SELECT * FROM users WHERE `email` = ?', 
      [email] // ✅ should be wrapped in array
    );
    if (user.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const values = [
      email,
      hashedPassword,
    ];

    // Insert user into DB — values wrapped in an array of arrays ✅
    await db.execute(
      'INSERT INTO users ( `email`, `password`) VALUES (?, ?)',
      [...values] //  direct flat array (7 ? marks above matches 7 values)
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// User Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.execute(
      'SELECT * FROM users WHERE email = ?', 
      [email] // ✅ correct array binding
    );
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user[0].id);

    res.status(200).json({
      message: 'Login successful',
      token,
      userData: {
        id: user[0].id,
        email: user[0].email,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
    console.log(error.message);
  }
};
