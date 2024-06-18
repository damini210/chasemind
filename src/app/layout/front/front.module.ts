import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FrontRoutes } from './front.routing';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ServicesComponent } from './services/services.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(FrontRoutes),
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

export class FrontModule { ServicesComponent }
