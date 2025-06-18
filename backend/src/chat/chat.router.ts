import { Router } from 'express';
import * as ChatController from './chat.controller';

const router = Router();

router.get('/', ChatController.getChats);
router.get('/:id', ChatController.getChat);
router.post('/', ChatController.createChat);
router.post('/:id/messages', ChatController.createMessage);

export default router;
