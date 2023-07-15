const router = require('express').Router();
const {
    validateUserInfo
} = require('../validate/userValidate');
const {
    getUser,
    updateUser,
} = require();

router.get('/me', getUser);
router.patch('/me', validateUserInfo, updateUser);

module.exports = router;
