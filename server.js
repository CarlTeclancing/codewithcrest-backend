const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config();
const db = require('./config/db');



const app = express();
//app.use(cors());

// Allow requests from localhost:5173 (Vite/React frontend)
app.use(
    cors({
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],

    })
)

app.use(express.json());
app.use(morgan('dev'));

// Routes
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./auth/authRoutes')
const challengeRoutes = require('./routes/challengeRoutes')
const profileRoutes = require('./routes/profileRoutes')
const labRoutes = require('./routes/labRoutes')
const postRoutes = require('./routes/postRoutes')
const commentRoutes = require('./routes/commentRoutes')
const subscriptionRoutes = require('./routes/subscriptionRoutes')

const courseRoutes = require('./routes/courseRoutes')
const moduleRoutes = require('./routes/moduleRoutes')
const userLabRoutes = require('./routes/userLabRoutes')
const userChallengeRoutes = require('./routes/userChallengeRoutes')


app.use("/api/auth" ,authRoutes)
app.use("/api/user" ,userRoutes)
app.use("/api/profile" ,profileRoutes)
app.use("/api/challenge" ,challengeRoutes)
app.use("/api/lab" ,labRoutes)
app.use("/api/post" ,postRoutes)
app.use("/api/comment" ,commentRoutes)
app.use("/api/subscription" ,subscriptionRoutes)

app.use("/api/user-lab" ,userLabRoutes)
app.use("/api/user-challenge" ,userChallengeRoutes)
app.use("/api/modules", moduleRoutes)
app.use("/api/courses" ,courseRoutes)



// Add this before app.listen()
app.get('/', (req, res) => {
    res.send("Welcome to codewithcrest")
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
