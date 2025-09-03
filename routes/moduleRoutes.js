const  express = require('express')
const { createModule, getAllModule, getModuleById, updateModule, deleteModule } = require('../controllers/moduleController')
const router = express.Router()

router.route("/")
.post(createModule)
.get(getAllModule)

router.route("/:id")
.get(getModuleById)
.put(updateModule)
.delete(deleteModule)

// router.get("/user/userId" ,)

module.exports = router