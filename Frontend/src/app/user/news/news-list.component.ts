import { Component } from '@angular/core';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { INews } from '../../shared/interfaces/news.interface';
import { PageComponent } from "../../shared/layout/page/page.component";

@Component({
  selector: 'news-list',
  imports: [PageComponent, NewsGridComponent],
  templateUrl: './news-list.component.html',
  styleUrl: './news-list.component.css'
})
export class NewsListComponent {
  newsList: INews[] = [];

  bindNewsList(newsList: INews[]): void {
    this.newsList = newsList;
  }
}
