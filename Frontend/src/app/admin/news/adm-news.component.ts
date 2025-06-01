import { Component } from '@angular/core';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { AdmPageComponent } from "../../shared/layout/admin-page/adm-page.component";

@Component({
  selector: 'adm-news',
  imports: [AdmPageComponent, NewsGridComponent],
  templateUrl: './adm-news.component.html',
  styleUrl: './adm-news.component.css'
})
export class AdmNewsComponent {

  addNews(): void {
    //todo: Implementar a lógica para adicionar uma nova notícia
  }
}
