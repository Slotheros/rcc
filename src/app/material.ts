import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule} from '@angular/material';




@NgModule({
    imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatSidenavModule],
    exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule, MatInputModule, MatSidenavModule],
})
export class MaterialModule { }