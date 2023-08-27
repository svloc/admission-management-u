import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TekgainComponentRoutingModule } from './tekgain-component-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';
import {CarouselModule} from 'primeng/carousel';
import {ChartModule} from 'primeng/chart';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from 'primeng/api';
import { ContactUsComponent } from './dashboard/dashboard-components/contact-us/contact-us.component';
import { DashboardCardComponent } from './dashboard/dashboard-components/dashboard-card/dashboard-card.component';
@NgModule({
  declarations: [
    DashboardComponent,
    ContactUsComponent,
    DashboardCardComponent
  ],
  imports: [
    CommonModule,
    TekgainComponentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    ToolbarModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    CarouselModule,
    ChartModule,
    SplitButtonModule
  ]
})
export class TekgainComponentModule { }
