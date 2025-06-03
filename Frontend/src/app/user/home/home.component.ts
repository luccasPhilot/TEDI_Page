import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/layout/header/header.component';
import { FooterComponent } from '../../shared/layout/footer/footer.component';

@Component({
  selector: 'home',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {}
