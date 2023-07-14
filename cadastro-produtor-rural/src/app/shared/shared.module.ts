import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfCnpjPipe } from './pipes/cpfCnpj/cpfCnpj.pipe';


@NgModule({
  declarations: [
    CpfCnpjPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CpfCnpjPipe
  ]
})
export class SharedModule { }
