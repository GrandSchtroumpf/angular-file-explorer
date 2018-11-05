import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';

import { ExplorerComponent } from './explorer/explorer.component';
import { FormComponent } from './form/form.component';
import { ViewComponent } from './view/view.component';

@NgModule({
  declarations: [
    FormComponent,
    ExplorerComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    UiModule
  ],
  exports: [
    ViewComponent
  ],
  entryComponents: [
    FormComponent
  ]
})
export class FileExplorerModule { }
