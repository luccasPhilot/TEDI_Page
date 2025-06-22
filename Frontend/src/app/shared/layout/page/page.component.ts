import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { INews } from '../../interfaces/news.interface';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'page',
  imports: [HeaderComponent, FooterComponent, SearchBarComponent, MatIconModule, MatTooltipModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageComponent {
  @Input() title: string = '';
  @Input() newsList!: INews[];
  @Input() isLoginScreen: boolean = false;
  @Input() showFilterButton: boolean = false;
  @Input() showSearchBar: boolean = false;
  @Output() filterButtonClicked = new EventEmitter<void>();
  @Output() contactButtonClicked = new EventEmitter<void>();

  searchQuery!: string;
}
