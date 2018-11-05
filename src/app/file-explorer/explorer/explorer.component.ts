import { FormComponent } from './../form/form.component';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { FileNode } from './../+state';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'file-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExplorerComponent {

  @Input() nodes: FileNode[];
  @Input() canNavigateUp: string;
  @Input() path: string;

  @Output() nodeAdded = new EventEmitter<Partial<FileNode>>();
  @Output() nodeRemoved = new EventEmitter<FileNode>();
  @Output() nodeRenamed = new EventEmitter<FileNode>();
  @Output() nodeMoved = new EventEmitter<{ node: FileNode; moveTo: FileNode }>();
  @Output() navigatedDown = new EventEmitter<FileNode>();
  @Output() navigatedUp = new EventEmitter();

  constructor(private dialog: MatDialog) {}

  public deleteNode(node: FileNode) {
    this.nodeRemoved.emit(node);
  }

  public navigate(node: FileNode) {
    if (!node.isFolder) { return; }
    this.navigatedDown.emit(node);
  }

  public navigateUp() {
    this.navigatedUp.emit();
  }

  public moveNode(node: FileNode, moveTo: FileNode) {
    this.nodeMoved.emit({ node: node, moveTo: moveTo });
  }

  public openNewNodeDialog(isFolder: boolean) {
    const ref = this.dialog.open(FormComponent);
    ref.afterClosed()
      .subscribe(name => this.nodeAdded.emit({ name, isFolder }));
  }

  public openRenameDialog(node: FileNode) {
    const ref = this.dialog.open(FormComponent, { data: node });
    ref.afterClosed()
      .subscribe(name => {
        node.name = name;
        this.nodeRenamed.emit(node);
      });
  }

  public openMenu(event: MouseEvent, menu: MatMenuTrigger) {
    event.preventDefault();
    menu.openMenu();
  }
}
