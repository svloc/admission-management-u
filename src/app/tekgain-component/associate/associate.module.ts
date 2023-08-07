import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssociateRoutingModule } from './associate-routing.module';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    AssociateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class AssociateModule { }
