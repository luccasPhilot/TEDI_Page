import { Component } from '@angular/core';
import { NewsComponent } from "../../shared/components/news/news.component";
import { AdmPageComponent } from "../../shared/layout/admin-page/adm-page.component";

@Component({
  selector: 'adm-news',
  imports: [AdmPageComponent, NewsComponent],
  templateUrl: './adm-news.component.html',
  styleUrl: './adm-news.component.css'
})
export class AdmNewsComponent {

}
