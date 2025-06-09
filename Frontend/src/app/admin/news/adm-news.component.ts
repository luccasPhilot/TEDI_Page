import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { INews } from '../../shared/interfaces/news.interface';
import { AdmPageComponent } from "../../shared/layout/admin-page/adm-page.component";

@Component({
  selector: 'adm-news',
  imports: [AdmPageComponent, NewsGridComponent],
  templateUrl: './adm-news.component.html',
  styleUrl: './adm-news.component.css'
})
export class AdmNewsComponent {
  newsList: INews[] = [];

  constructor(private readonly router: Router) { }

  bindNewsList(newsList: INews[]): void {
    this.newsList = newsList;
  }

  addNews(): void {
    this.router.navigate(['/adm-news/new']);
  }
}
