import { NgModule } from '@angular/core';

import { MatToolbarModule, 
    MatIconModule, 
    MatCardModule, 
    MatInputModule,
    MatButtonModule, 
    MatListModule } from '@angular/material';


const modules =  [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatListModule
];

@NgModule({
    imports:modules,
    exports: modules
})

export class MaterialModule { }