import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { INews } from '../../shared/interfaces/news.interface';
import { PageComponent } from '../../shared/layout/page/page.component';

@Component({
  selector: 'home',
  imports: [PageComponent, NewsGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('contactFormRef') contactForm!: ElementRef;

  newsList: INews[] = [];

  constructor(private readonly http: HttpClient, private readonly location: Location, private readonly router: Router) { }

  ngAfterViewInit(): void {
    this.getNews();
    const navState = this.location.getState() as { scrollToContact?: boolean };

    if (navState?.scrollToContact) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.scrollToContact();
        });
      }, 200);
    }
  }

  getNews(): void {
    this.http.get<INews[]>(`${environment.apiUrl}/news/latest`).subscribe({
      next: (result) => {
        this.newsList = result;
        this.sortNewsByDate();
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }

  sortNewsByDate(): void {
    this.newsList.sort((a, b) => new Date(b.creation_date).getTime() - new Date(a.creation_date).getTime());
  }

  scrollToContact(): void {
    this.contactForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
