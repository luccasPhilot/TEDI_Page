import { Component, EventEmitter, Output } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'page',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  @Output() contactButtonClicked = new EventEmitter<void>();
}
