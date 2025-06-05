import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PageComponent } from '../../shared/layout/page/page.component';

@Component({
  selector: 'home',
  imports: [PageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('contactFormRef') contactForm!: ElementRef;
  constructor(private readonly location: Location) { }

  ngAfterViewInit(): void {
    const navState = this.location.getState() as { scrollToContact?: boolean };

    if (navState?.scrollToContact) {
      setTimeout(() => { this.scrollToContact() });
    }
  }

  scrollToContact(): void {
    this.contactForm.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
