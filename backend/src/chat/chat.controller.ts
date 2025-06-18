import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { db } from '../db';
import { APIChat } from '../types';

/**
 * Get all chat sessions
 */
export function getChats(req: Request, res: Response, next: NextFunction) {
  try {
    const chats = db.data.chats || [];
    res.json(chats.map(({ id, title, createdAt }) => ({ id, title, createdAt })));
  } catch (error) {
    next(error);
  }
}

/**
 * Get specific chat content
 */
export function getChat(req: Request, res: Response, next: NextFunction) {
  try {
    const chat = db.data.chats.find(c => c.id === req.params.id);
    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
      return next();
    }
    res.json(chat);
  } catch (error) {
    next(error);
  }
}

/**
 * Create new chat
 */
export async function createChat(req: Request, res: Response, next: NextFunction) {
  try {
    const chatId = nanoid();
    const newChat: APIChat = {
      id: chatId,
      title: chatId,
      createdAt: new Date().getTime(),
      messages: [],
    };

    db.data.chats.push(newChat);
    await db.write();

    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
}

/**
 * Add message to chat
 */
export async function createMessage(req: Request, res: Response, next: NextFunction) {
  try {
    const message = req.body?.message;

    const chat = db.data.chats.find(c => c.id === req.params.id);
    if (!chat) {
      res.status(404).json({ error: 'Chat not found' });
      return next();
    }

    chat.messages.push(message);
    await db.write();

    res.status(201).json(message);
  } catch (error) {
    next(error);
  }
}
