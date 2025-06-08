import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header-component',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() contactButtonClicked = new EventEmitter<void>();

  constructor(private readonly router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onContactButtonClick(): void {
    if (this.router.url === '/') {
      this.contactButtonClicked.emit();
    } else {
      this.router.navigateByUrl('', { state: { scrollToContact: true } });
    }
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
