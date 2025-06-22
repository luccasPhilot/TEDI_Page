import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { AdvancedNewsFilterComponent } from "../../shared/components/news/advanced-news-filter/advanced-news-filter.component";
import { ICategory } from '../../shared/interfaces/category.interface';
import { INews } from '../../shared/interfaces/news.interface';
import { PageComponent } from "../../shared/layout/page/page.component";

@Component({
  selector: 'news-list',
  imports: [PageComponent, NewsGridComponent, AdvancedNewsFilterComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent implements OnInit {
  newsList: INews[] = [];
  categories: ICategory[] = [];
  showFilter = false;

  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.getNews();
    this.getCategories();
  }

  getNews(): void {
    this.http.get<INews[]>(`${environment.apiUrl}/news`).subscribe({
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
