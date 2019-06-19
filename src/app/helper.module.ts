import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlPreviewComponent } from './html-preview/html-preview.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HtmlPreviewComponent,
  ],
  exports: [
    HtmlPreviewComponent,
  ]
})
export class HelperModule { }
