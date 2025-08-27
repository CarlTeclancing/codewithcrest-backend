const  express = require('express')
const { createLab, getAllLab, getLabById, deleteLab, getLabByUserId, updateLab } = require('../controllers/labController')
const router = express.Router()

router.route("/")
.post(createLab)
.get(getAllLab)

router.route("/:id")
.get(getLabById)
.put(updateLab)
.delete(deleteLab)

router.get("/user/userId" ,getLabByUserId)

module.exports = router