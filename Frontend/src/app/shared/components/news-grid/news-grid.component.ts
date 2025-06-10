
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FeedbackPopupComponent } from '../../../shared/components/feedback-popup/feedback-popup.component';
import { INews } from '../../../shared/interfaces/news.interface';

@Component({
  selector: 'news-grid',
  imports: [MatIconModule, MatFormFieldModule, CommonModule, FormsModule, MatSelectModule, MatButtonModule, FeedbackPopupComponent],
  templateUrl: './news-grid.component.html',
  styleUrl: './news-grid.component.css'
})
export class NewsGridComponent {
  @Input() isLatest: boolean = false;
  @Input() isAdmin: boolean = false;
  @Input() newsList: INews[] = [];
  @Input() parentComponent: any;
  @Output() newsListLoaded = new EventEmitter<INews[]>();
  @ViewChild('container') containerRef!: ElementRef;

  feedbackMessage: string = '';
  feedbackType: 'success' | 'error' | '' = '';
  hasItemsSelected: boolean = false;

  constructor(private readonly http: HttpClient, private readonly router: Router, private readonly dialog: MatDialog) { }

  get isHorizontalLayout(): boolean {
    return this.newsList.length > 0 && this.newsList.length <= 3;
  }

  delete(news: INews): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: `Tem certeza que deseja remover a notícia: ${news.title}?`,
      },
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .delete(`${environment.apiUrl}/news/${news.id}`, {
            withCredentials: true,
          })
          .subscribe({
            next: () => {
              console.log('Notícia deletada com sucesso.');
              this.mostrarFeedback('Notícia removida com sucesso!', 'success');
              this.parentComponent.getNews();
            },
            error: (err) => {
              console.error('Erro ao deletar notícia:', err);
              this.mostrarFeedback(
                'Erro ao remover monitor. Tente novamente.',
                'error'
              );
            },
          });
      }
    });
  }

  openNews(event: any, news: INews, isButton: boolean = false): void {
    if (!isButton && ((event.target as HTMLElement).innerText === 'delete' || (event.target as HTMLElement).tagName === 'SPAN')) return;
    this.router.navigate([`/${this.isAdmin ? 'adm-news' : 'news'}/${news.id}`]);
  }

  private mostrarFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
  }
}
