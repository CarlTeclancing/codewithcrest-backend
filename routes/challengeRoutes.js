const  express = require('express')
const { protect } = require('../auth/authMiddleware')
const { createChallenge, getAllChallenge, getChallengeById, updateChallenge, deleteChallenge } = require('../controllers/challengeController')
const router = express.Router()

router.route("/")
.post(protect, createChallenge)
.get(getAllChallenge)

router.route("/:id")
.get(getChallengeById)
.put(protect ,updateChallenge)
.delete(protect ,deleteChallenge)

module.exports = router