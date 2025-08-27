const express = require('express');
const { getUserSubscription, getSubscriptionById, getAllSubscription, makeSubscription } = require('../controllers/subscriptionController');
const router = express.Router();


router.route("/")
.get(getAllSubscription)
.post(makeSubscription)

router.route("/:id")
.get(getSubscriptionById)

router.get("/user/userId" ,getUserSubscription)


// payment web hook

module.exports = router;
