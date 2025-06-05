
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { INews } from '../../../shared/interfaces/news.interface';

@Component({
  selector: 'news-grid',
  imports: [MatIconModule, MatFormFieldModule, CommonModule, FormsModule, MatSelectModule],
  templateUrl: './news-grid.component.html',
  styleUrl: './news-grid.component.css'
})
export class NewsGridComponent implements OnInit {
  @ViewChild('container') containerRef!: ElementRef;

  hasItemsSelected: boolean = false;

  selectedPaymentType: string = '';
  matrixMaxHeight!: string;
  leftColumnHeight!: string;
  totalCost: number = 0;
  totalTaxes: number = 0;
  newsList: INews[] = [];
  selectedItems: any[] = [];

  constructor(private readonly http: HttpClient, private readonly cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getNews();
  }

  get isHorizontalLayout(): boolean {
    return this.newsList.length > 0 && this.newsList.length <= 3;
  }

  getNews(): void {
    this.http.get<INews[]>(`${environment.apiUrl}/news`).subscribe({
      next: (result) => {
        this.newsList = result.map(news => ({ ...news, quantity: 0 }));
        debugger
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }

  setMatrixMaxHeight(toolbarHeight: number): void {
    const headerMarginBottom = 10;
    const pageOccupiedHeight = toolbarHeight + this.containerRef.nativeElement.offsetHeight + headerMarginBottom;
    this.matrixMaxHeight = `calc(100vh - ${pageOccupiedHeight}px)`;

    const registerHeaderHeight = 32;
    const matrixOccupiedHeight = pageOccupiedHeight + registerHeaderHeight;
    this.leftColumnHeight = `calc(100vh - ${matrixOccupiedHeight}px)`;

    this.cdr.detectChanges();
  }

  getProxyImageUrl(originalUrl: string): SafeResourceUrl {
    const imageUrl = '/proxy-imagem?url=' + encodeURIComponent(originalUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(imageUrl);
  }
}
