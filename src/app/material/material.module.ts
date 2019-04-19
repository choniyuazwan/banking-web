import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatToolbarModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
