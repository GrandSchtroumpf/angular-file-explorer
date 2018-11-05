import { ID } from '@datorama/akita';

export interface FileNode {
  id: ID;
  isFolder: boolean;
  name: string;
  parent: ID;
  content: string;
}

export function createFileNode(params: Partial<FileNode>) {
  return {
    ...params
  } as FileNode;
}
