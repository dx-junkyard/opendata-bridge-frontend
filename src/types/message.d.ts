export type Message = {
  role: 'user' | 'assistant';
  content: string;
  fileId?: string;
  datetime: string;
};
