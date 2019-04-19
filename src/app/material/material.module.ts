import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
} from '@angular/material';

const material = [
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
]

@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
