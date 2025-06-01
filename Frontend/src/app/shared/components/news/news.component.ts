
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'news',
  imports: [MatIconModule, MatFormFieldModule, CommonModule, FormsModule, MatSelectModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent implements OnInit {
  @ViewChild('container') containerRef!: ElementRef;

  hasItemsSelected: boolean = false;

  selectedPaymentType: string = '';
  matrixMaxHeight!: string;
  leftColumnHeight!: string;
  totalCost: number = 0;
  totalTaxes: number = 0;
  products: any[] = [];
  selectedItems: any[] = [];
  paymentTypes: any[] = [
    { id: 'K3l8N5o1', name: 'Dinheiro' },
    { id: 'R6q2S9t4', name: 'Crédito' },
    { id: 'V7u1W3x5', name: 'Débito' },
    { id: 'Z9y4A2b6', name: 'Pix' }
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getNews();
  }

  getNews(): void {
    this.http.get<any[]>(`${environment.apiUrl}/news`).subscribe({
      next: (result) => {
        this.products = result.map(product => ({ ...product, quantity: 0 }));
      },
      error: (error) => {
        alert(error.error.error);
      }
    });
  }

  increaseQuantity(product: any): void {
    product.quantity++;
    this.updateSelectedItems(product);
  }

  decreaseQuantity(product: any): void {
    if (product.quantity > 0) {
      product.quantity--;
      this.updateSelectedItems(product);
    }
  }

  updateSelectedItems(product: any): void {
    const existingItem = this.selectedItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = product.quantity;

      if (existingItem.quantity === 0) {
        this.selectedItems = this.selectedItems.filter(item => item.id !== product.id);
      }
    } else {
      this.selectedItems.push({ ...product });
    }

    this.hasItemsSelected = this.selectedItems.length > 0;
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totalCost = this.selectedItems.reduce((sum, item) => sum + (item.cost * item.quantity), 0);
    this.totalTaxes = this.selectedItems.reduce((sum, item) => sum + (item.cost * item.quantity * (item.tax / 100)), 0);
  }

  clearCart(): void {
    this.selectedItems = [];
    this.hasItemsSelected = false;
    this.products.forEach(product => product.quantity = 0);
    this.calculateTotals();
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
}
