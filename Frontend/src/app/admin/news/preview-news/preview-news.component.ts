import { Component } from '@angular/core';
import { NewsComponent } from "../../../shared/components/news/news.component";
import { AdmPageComponent } from "../../../shared/layout/admin-page/adm-page.component";

@Component({
  selector: 'preview-news',
  imports: [AdmPageComponent, NewsComponent],
  templateUrl: './preview-news.component.html',
  styleUrl: './preview-news.component.css'
})
export class PreviewNewsComponent {

}
