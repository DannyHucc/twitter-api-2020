'use strict'

const router = require('express').Router()

const tweetController = require('../../controllers/tweetController')
const { authenticated } = require('../../middleware/auth')
const { isUser, isAuthUser } = require('../../middleware/role-check')

router.get('/:tweet_id/replies', authenticated, isUser, tweetController.getReplies)
router.get('/:tweet_id', authenticated, isUser, tweetController.getTweet)
router.get('/', authenticated, tweetController.getTweets)
router.post('/', authenticated, isUser, isAuthUser, tweetController.postTweet)

module.exports = router
