import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ITeam } from '../../../shared/interfaces/team.interface';

@Component({
  selector: 'app-view-team',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './view-team.component.html',
  styleUrl: './view-team.component.css',
})
export class ViewTeamComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewTeamComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITeam
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
