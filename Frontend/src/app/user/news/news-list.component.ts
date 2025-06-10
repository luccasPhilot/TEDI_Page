import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { INews } from '../../shared/interfaces/news.interface';
import { PageComponent } from "../../shared/layout/page/page.component";

@Component({
  selector: 'news-list',
  imports: [PageComponent, NewsGridComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent implements OnInit {
  newsList: INews[] = [];

  constructor(private readonly http: HttpClient) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.http.get<INews[]>(`${environment.apiUrl}/news`).subscribe({
      next: (result) => {
        this.newsList = result
          .map(news => ({ ...news, quantity: 0 }))
          .sort((a, b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }
}
