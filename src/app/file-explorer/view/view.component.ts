import { ID } from '@datorama/akita';
import { Component, OnInit } from '@angular/core';
import { FileNode, FileNodeQuery, FileNodeService, createFileNode } from '../+state';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const ROOT: ID = 0;

@Component({
  selector: 'file-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public nodes$: Observable<FileNode[]>;
  public fileNodes$: Observable<FileNode[]>;
  public currentRoot$: Observable<FileNode>;
  public currentPath: string;
  public canNavigateUp = false;

  constructor(
    private query: FileNodeQuery,
    private service: FileNodeService
  ) { }

  ngOnInit() {
    this.nodes$ = this.query.selectAll();
    this.currentRoot$ = this.query.selectActive();
    this.fileNodes$ = this.query.selectActive().pipe(
      switchMap(currentRoot => this.query.queryChildren(currentRoot ? currentRoot.id : ROOT))
    );
  }

  public addNode({name, isFolder}: Partial<FileNode>) {
    const currentRoot = this.query.getActive();
    const parent = currentRoot ? currentRoot.id : ROOT;
    this.service.add(createFileNode({ name, isFolder, parent }));
  }

  public removeNode({ id }: FileNode) {
    this.service.delete(id);
  }

  public moveNode({ node, moveTo }: { node: FileNode, moveTo: FileNode }) {
    this.service.update(node.id, { parent: moveTo.id });
  }

  public renameNode(element: FileNode) {
    this.service.update(element.id, { name: element.name });
  }

  public navigateUp() {
    const currentRoot = this.query.getActive();
    if (currentRoot && currentRoot.parent === ROOT) {
      this.service.setActive(null),
      this.canNavigateUp = false;
    } else {
      this.service.setActive(currentRoot.parent);
    }
    this.currentPath = this.popFromPath(this.currentPath);
  }

  public navigateToFolder(node: FileNode) {
    this.service.setActive(node.id);
    this.currentPath = this.pushToPath(this.currentPath, node.name);
    this.canNavigateUp = true;
  }

  private pushToPath(path: string, folderName: string): string {
    let p = path ? path : '';
    p += `${folderName}/`;
    return p;
  }

  private popFromPath(path: string): string {
    let p = path ? path : '';
    const split = p.split('/');
    split.splice(split.length - 2, 1);
    p = split.join('/');
    return p;
  }
}
