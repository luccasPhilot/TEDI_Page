import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { INews } from '../../shared/interfaces/news.interface';
import { AdmPageComponent } from "../../shared/layout/admin-page/adm-page.component";
@Component({
  selector: 'adm-news',
  imports: [AdmPageComponent, NewsGridComponent],
  templateUrl: './adm-news.component.html',
  styleUrl: './adm-news.component.css'
})
export class AdmNewsComponent implements OnInit {
  newsList: INews[] = [];

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

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

  addNews(): void {
    this.router.navigate(['/adm-news/new']);
  }
}
