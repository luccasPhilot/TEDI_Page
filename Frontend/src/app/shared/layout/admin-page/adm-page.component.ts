import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'adm-page',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule],
  templateUrl: './adm-page.component.html',
  styleUrl: './adm-page.component.css'
})
export class AdmPageComponent {
  constructor(private readonly router: Router) { }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
