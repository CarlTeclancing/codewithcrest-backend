const  express = require('express')
const { createCourse, getAllCourse, getCourseById, updateCourse, deleteCourse } = require('../controllers/courseController')
const router = express.Router()

router.route("/")
.post(createCourse)
.get(getAllCourse)

router.route("/:id")
.get(getCourseById)
.put(updateCourse)
.delete(deleteCourse)

// router.get("/user/userId" ,)

module.exports = router