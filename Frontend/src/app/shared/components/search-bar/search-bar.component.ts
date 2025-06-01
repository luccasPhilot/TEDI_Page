import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'search-bar',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, MatIconModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Pesquise aqui';
  @Input() dataSource = new MatTableDataSource<any>([]);
  @Input() searchQuery: string = '';

  applySearch(): void {
    if (this.dataSource)
      this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }
}
