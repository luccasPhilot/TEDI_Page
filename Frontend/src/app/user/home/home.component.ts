import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NewsGridComponent } from "../../shared/components/news-grid/news-grid.component";
import { PageComponent } from '../../shared/layout/page/page.component';

@Component({
  selector: 'home',
  imports: [PageComponent, NewsGridComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('contactFormRef') contactForm!: ElementRef;
  constructor(private readonly location: Location, private readonly router: Router) { }

  ngAfterViewInit(): void {
    const navState = this.location.getState() as { scrollToContact?: boolean };

    if (navState?.scrollToContact) {
      setTimeout(() => { this.scrollToContact() });
    }
  }

  scrollToContact(): void {
    this.contactForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
