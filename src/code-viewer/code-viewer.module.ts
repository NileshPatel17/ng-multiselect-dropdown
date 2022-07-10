import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CodeViewerComponent} from './code-viewer';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CodeViewerComponent
  ],
  exports: [CodeViewerComponent]
})
export class ShCodeViewer {
  static forRoot(): ModuleWithProviders<ShCodeViewer> {
    return {
      ngModule: ShCodeViewer,
      providers: []
    };
  }
}
