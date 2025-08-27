const  express = require('express')
const { createPost, getAllPost, getPostById, updatePost, deletePost } = require('../controllers/postController')
const router = express.Router()

router.route("/")
.post(createPost)
.get(getAllPost)

router.route("/:id")
.get(getPostById)
.put(updatePost)
.delete(deletePost)

module.exports = router