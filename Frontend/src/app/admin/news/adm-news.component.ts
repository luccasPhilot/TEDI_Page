import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { AdvancedNewsFilterComponent } from "../../shared/components/news/advanced-news-filter/advanced-news-filter.component";
import { ICategory } from '../../shared/interfaces/category.interface';
import { INewsFilterCriteria } from '../../shared/interfaces/news-filter-criteria.interface';
import { INews } from '../../shared/interfaces/news.interface';
import { AdmPageComponent } from "../../shared/layout/admin-page/adm-page.component";
@Component({
  selector: 'adm-news',
  imports: [AdmPageComponent, NewsGridComponent, MatIconModule, AdvancedNewsFilterComponent],
  templateUrl: './adm-news.component.html',
  styleUrl: './adm-news.component.css'
})
export class AdmNewsComponent implements OnInit {
  newsList: INews[] = [];
  categories: ICategory[] = [];
  currentFilterCriteria: INewsFilterCriteria = {
    title: '',
    draft: null,
    startDate: '',
    endDate: '',
    categoryId: null,
    orderBy: 'creation_date',
    draftPriority: 'first'
  };
  showFilter = false;

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  ngOnInit(): void {
    this.getNews();
    this.getCategories();
  }

  getNews(): void {
    const params = { showDrafts: true };

    this.http.get<INews[]>(`${environment.apiUrl}/news`, { params }).subscribe({
      next: (result) => {
        this.newsList = result;
        this.sortNewsByDate();
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }

  sortNewsByDate(): void {
    this.newsList.sort((a, b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
  }

  addNews(): void {
    this.router.navigate(['/adm-news/new']);
  }

  getCategories(): void {
    this.http
      .get<ICategory[]>(`${environment.apiUrl}/category`, {
        withCredentials: true,
      })
      .subscribe({
        next: (result: any) => {
          this.categories = result;
        },
        error: (error) => {
          alert(error.error.error);
        },
      });
  }
}
