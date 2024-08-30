import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontLayoutRoutes } from './front-layout.routing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ServicesComponent } from '../../front/services/services.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FrontLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        DragDropModule,
    ],
    declarations: [
        ServicesComponent
        // BlogListComponent,
        // ContactComponent,
        // TeamListComponent,
        // FaqListComponent,
    ]

})

export class FrontLayoutModule { ServicesComponent }
