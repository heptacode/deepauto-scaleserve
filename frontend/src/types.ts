import { ChatCompletionChunk } from 'openai/resources';
import type { QueryRouting } from '../../shared/types';

export type FirstChunk = ChatCompletionChunk & QueryRouting;

export * from '../../shared/types';
