import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import type { DB } from './types';

const DB_FILE_NAME = 'db.json';

const adapter = new JSONFile<DB>(DB_FILE_NAME);
export const db = new Low<DB>(adapter, { chats: [] });

export async function loadDb() {
  await db.read();
}
