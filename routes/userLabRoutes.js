const  express = require('express')
const { createUserLab, getAllUserLab, getUserLabById, updateUserLab, deleteUserLab } = require('../controllers/userLabController')
const router = express.Router()

router.route("/")
.post(createUserLab)
.get(getAllUserLab)

router.route("/:id")
.get(getUserLabById)
.put(updateUserLab)
.delete(deleteUserLab)

// router.get("/user/userId" ,)

module.exports = router