import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { INews } from '../../../shared/interfaces/news.interface';
import { PageComponent } from '../../layout/page/page.component';
import { NewsGridComponent } from '../news-grid/news-grid.component';

@Component({
  selector: 'news',
  imports: [PageComponent, CommonModule, NewsGridComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  id!: string;
  news!: INews;
  newsList!: INews[];
  apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.getNew();
      this.getNews();
    });
  }

  getNew(): void {
    this.http.get<INews>(`${this.apiUrl}/news/${this.id}`).subscribe({
      next: (result) => {
        this.news = result;
      },
      error: (error) => {
        alert(error.error.error);
      },
    });
  }

  getNews(): void {
    this.http.get<INews[]>(`${this.apiUrl}/news/latest`).subscribe({
      next: (result) => {
        this.newsList = result;
        this.sortNewsByDate();
      },
      error: (error) => {
        alert(error.error.error);
      },
    });
  }

  sortNewsByDate(): void {
    this.newsList.sort(
      (a, b) =>
        new Date(b.creation_date).getTime() -
        new Date(a.creation_date).getTime()
    );
  }
}
