import { Injectable } from '@angular/core';
import { FileNodeStore } from './file-node.store';
import { FileNode } from './file-node.model';
import { ID } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class FileNodeService {

  constructor(private store: FileNodeStore) {}

  public add(node: FileNode) {
    // TODO : Add the hash of the content as an ID
    this.store.add({...node, id: Math.floor(Math.random() * 10000)});
  }

  public delete(id: ID) {
    this.store.remove(id);
  }

  public update(id: ID, update: Partial<FileNode>) {
    this.store.update(id, update);
  }

  public clone(node: FileNode) {
    return { ...node };
  }

  public setActive(id: ID) {
    this.store.setActive(id);
  }

}
