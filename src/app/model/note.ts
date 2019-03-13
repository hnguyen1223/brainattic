import { Chunk } from './chunk';

export interface Note {
  id: string;
  title: string;
  created: Date;
  modified: Date;
  tags: string[];
  fav: boolean;
  content: Chunk[];
}

export const TextTypes = {
  TEXT: 1,
  CODE: 2,
  LINK: 3
};
