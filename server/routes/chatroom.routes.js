const router = require('express').Router();
const { catchErrors } = require('../handlers/errorHandlers');
const chatroomController = require('../controllers/chatroom.controller');

const auth = require('../middlewares/auth')

router.post('/', auth, catchErrors(chatroomController.createChatroom));
router.get('/', auth, catchErrors(chatroomController.getAllChatrooms));
router.get('/:id', auth, catchErrors(chatroomController.getOneChatroom));
router.delete('/', auth, catchErrors(chatroomController.deleteChatroom));

module.exports = router;