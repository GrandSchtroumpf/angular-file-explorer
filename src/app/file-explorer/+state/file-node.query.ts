import { Injectable } from '@angular/core';
import { QueryEntity, QueryConfig, Order, ID } from '@datorama/akita';
import { FileNodeStore, FileNodeState } from './file-node.store';
import { FileNode } from './file-node.model';

@Injectable({ providedIn: 'root' })
@QueryConfig({
  sortBy: 'parent',
  sortByOrder: Order.ASC
})
export class FileNodeQuery extends QueryEntity<FileNodeState, FileNode> {

  public queryChildren(folderId: ID) {
    return this.selectAll({ filterBy: node => node.parent === folderId });
  }

  constructor(protected store: FileNodeStore) {
    super(store);
  }

}
