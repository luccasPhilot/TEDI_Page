import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { IMonitor } from '../../../shared/interfaces/monitor.interface';

@Component({
  selector: 'view-monitor',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    DatePipe,
  ],
  templateUrl: './view-monitor.component.html',
  styleUrls: ['./view-monitor.component.css'],
})
export class ViewMonitorComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewMonitorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMonitor
  ) {}

  fechar(): void {
    this.dialogRef.close();
  }
}
