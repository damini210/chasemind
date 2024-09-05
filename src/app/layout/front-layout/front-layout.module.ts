import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontLayoutRoutingModule } from './front-layout.routing.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FrontLayoutRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
    ],
    declarations: [
        // ServicesComponent
        // BlogListComponent,
        // ContactComponent,
        // TeamListComponent,
        // FaqListComponent,
    ]

})

export class FrontLayoutModule { ServicesComponent }
