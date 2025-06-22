import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INewsFilterCriteria } from '../../../interfaces/news-filter-criteria.interface';
import { INews } from '../../../interfaces/news.interface';

@Component({
  selector: 'advanced-news-filter',
  templateUrl: './advanced-news-filter.component.html',
  styleUrl: './advanced-news-filter.component.css',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class AdvancedNewsFilterComponent {
  @Input() newsList: INews[] = [];
  @Input() categories: { id: string, name: string }[] = [];
  @Input() isAdmin: boolean = false;
  @Output() newsListChange = new EventEmitter<INews[]>();

  filter: INewsFilterCriteria = {
    title: '',
    draft: null,
    startDate: '',
    endDate: '',
    categoryId: null,
    orderBy: 'creation_date_desc',
    draftPriority: null
  };

  constructor() { }

  clearFilters(): void {
    this.filter = {
      title: '',
      draft: null,
      startDate: '',
      endDate: '',
      categoryId: null,
      orderBy: 'creation_date_desc',
      draftPriority: null
    };
    this.applySearch();
  }

  applySearch(): void {
    const titleQuery = this.filter.title?.trim().toLowerCase();
    const startDate = this.filter.startDate;
    const endDate = this.filter.endDate;
    const categoryId = this.filter.categoryId;
    const draftFilter = this.filter.draft;

    this.newsList.forEach(item => item.filtered = false);

    this.newsList.forEach(item => {
      let matches = true;

      if (
        (titleQuery && !item.title.toLowerCase().includes(titleQuery)) ||
        (categoryId && item.category_id !== categoryId) ||
        (draftFilter !== null && item.draft !== draftFilter) ||
        (startDate && item.creation_date < startDate) ||
        (endDate && item.creation_date > endDate)
      ) {
        matches = false;
      }

      item.filtered = !matches;
    });

    if (this.filter.orderBy === 'title') {
      this.newsList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (this.filter.orderBy === 'creation_date_asc') {
      this.newsList.sort((a, b) => a.creation_date.localeCompare(b.creation_date));
    } else if (this.filter.orderBy === 'creation_date_desc') {
      this.newsList.sort((a, b) => b.creation_date.localeCompare(a.creation_date));
    }

    if (this.filter.draftPriority === 'first') {
      this.newsList.sort((a, b) => (b.draft ? 1 : 0) - (a.draft ? 1 : 0));
    } else if (this.filter.draftPriority === 'last') {
      this.newsList.sort((a, b) => (a.draft ? 1 : 0) - (b.draft ? 1 : 0));
    }
  }
}
