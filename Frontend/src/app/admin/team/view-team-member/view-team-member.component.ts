import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ITeam } from '../../../shared/interfaces/team.interface';

@Component({
  selector: 'view-team-member',
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './view-team-member.component.html',
  styleUrl: './view-team-member.component.css',
})
export class ViewTeamMemberComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewTeamMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITeam
  ) { }

  fechar(): void {
    this.dialogRef.close();
  }
}
