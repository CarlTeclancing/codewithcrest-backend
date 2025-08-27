const  express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')

router.route("/")
.post(profileController.createProfile)
.get(profileController.getAllProfile)

router.route("/:id")
.get(profileController.getProfileById)
.put(profileController.updateProfile)

module.exports = router