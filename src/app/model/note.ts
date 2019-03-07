export interface Note {
  id: string;
  title: string;
  created: Date;
  modified: Date;
  tags: string[];
  fav: boolean;
  content: {
    text: string;
    type: number;
  }[];
}

export const TextTypes = {
  TEXT: 1,
  CODE: 2,
  LINK: 3
};
