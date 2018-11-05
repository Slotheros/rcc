import { NgModule } from '@angular/core';
import { MatToolbarModule, MatIconModule, MatIcon, MatMenuModule, MatDividerModule,
  MatFormFieldModule, MatOptionModule, MatSelectModule, MatButtonModule, MatCheckboxModule,
  MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule, MatSnackBarModule,
  MatDialogModule, MAT_DIALOG_DATA, MatTooltipModule, MatTableModule, MatSlideToggle } from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
    imports:
        [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule,
        MatSnackBarModule, MatDialogModule, MatDividerModule, MatTooltipModule,
        MatTableModule],
    exports:
        [CdkTableModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
        MatMenuModule, MatFormFieldModule, MatOptionModule, MatSelectModule,
        MatInputModule, MatSidenavModule, MatCardModule, MatExpansionModule,
        MatSnackBarModule, MatDialogModule, MatDividerModule, MatTooltipModule,
        MatTableModule]
})
export class MaterialModule { }
