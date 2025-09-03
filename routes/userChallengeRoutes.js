const  express = require('express')
const { createUserChallenge, getAllUserChallenge, getUserChallengeById, updateUserChallenge, deleteUserChallenge } = require('../controllers/userChallengeController')
const router = express.Router()

router.route("/")
.post(createUserChallenge)
.get(getAllUserChallenge)

router.route("/:id")
.get(getUserChallengeById)
.put(updateUserChallenge)
.delete(deleteUserChallenge)

// router.get("/user/userId" ,)

module.exports = router