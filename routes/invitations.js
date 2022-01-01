const express = require('express');
const auth = require("../middlewares/auth");
const { sendInvitation } = require('../controllers/invitation.controllers');


const router = new express.Router();



// Send Invitation Emails
router.post('/invitations',auth.simple, sendInvitation);

module.exports = router;
