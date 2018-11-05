import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { FileNode } from './file-node.model';

export interface FileNodeState extends EntityState<FileNode> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'file-node' })
export class FileNodeStore extends EntityStore<FileNodeState, FileNode> {

  constructor() {
    super();
  }

}

