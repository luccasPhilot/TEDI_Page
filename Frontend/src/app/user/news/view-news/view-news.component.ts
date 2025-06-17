import { Component } from '@angular/core';
import { NewsComponent } from "../../../shared/components/news/news.component";
import { PageComponent } from "../../../shared/layout/page/page.component";

@Component({
  selector: 'view-news',
  imports: [NewsComponent, PageComponent],
  templateUrl: './view-news.component.html',
  styleUrl: './view-news.component.css'
})
export class ViewNewsComponent {

}
