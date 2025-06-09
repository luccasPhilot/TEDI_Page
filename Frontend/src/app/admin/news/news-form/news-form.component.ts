import { Component, OnInit } from '@angular/core';
import { AdmPageComponent } from "../../../shared/layout/admin-page/adm-page.component";

@Component({
  selector: 'news-form',
  imports: [AdmPageComponent],
  templateUrl: './news-form.component.html',
  styleUrl: './news-form.component.css'
})
export class NewsFormComponent implements OnInit {

  isNew!: boolean;

  ngOnInit(): void {
    this.isNew = window.location.href.endsWith('/new');
  }

}
