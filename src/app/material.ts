import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule, MatSnackBarModule} from '@angular/material';



@NgModule({
    imports:
        [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule, MatSnackBarModule],
    exports:
        [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule, MatSnackBarModule],
})
export class MaterialModule { }
