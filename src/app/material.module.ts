import { NgModule } from '@angular/core';

import { MatToolbarModule, MatIconModule, MatCardModule } from '@angular/material';


const modules =  [
    MatToolbarModule,
    MatIconModule,
    MatIconModule
];

@NgModule({
    imports:modules,
    exports: modules
})

export class MaterialModule { }