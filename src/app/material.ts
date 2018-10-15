import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule, MatIcon} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatSidenavModule,
  MatCardModule, MatExpansionModule, MatSnackBarModule, MatDialogModule, MAT_DIALOG_DATA, MatTooltipModule } from '@angular/material';

@NgModule({
    imports:
        [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule,
        MatSnackBarModule, MatDialogModule, MatDividerModule, MatTooltipModule],
    exports:
        [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule,
        MatSnackBarModule, MatDialogModule, MatDividerModule, MatTooltipModule],
})
export class MaterialModule { }
