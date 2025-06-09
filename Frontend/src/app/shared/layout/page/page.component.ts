import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'page',
  imports: [HeaderComponent, FooterComponent, SearchBarComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  @Input() title: string = '';
  @Input() isLoginScreen: boolean = false;
  @Input() showSearchBar: boolean = false;
  @Input() dataSource: any = null;
  @Output() contactButtonClicked = new EventEmitter<void>();

  searchQuery!: string;
}
