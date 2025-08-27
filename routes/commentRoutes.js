const  express = require('express')
const { createComment, getAllComment, getCommentById, deleteComment, getCommentByPostId } = require('../controllers/commentController')
const router = express.Router()

router.route("/")
.post(createComment)
.get(getAllComment)

router.route("/:id")
.get(getCommentById)
.delete(deleteComment)

router.get("/post/postId" ,getCommentByPostId)

module.exports = router